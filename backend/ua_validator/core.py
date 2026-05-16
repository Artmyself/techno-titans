import unicodedata

import idna
from email_validator import EmailNotValidError, validate_email


def detect_scripts(text: str) -> list[str]:
    scripts = []
    seen = set()

    for character in text:
        if not character.isalpha():
            continue

        name = unicodedata.name(character, '')
        script = None

        if 'DEVANAGARI' in name:
            script = 'Devanagari'
        elif 'ARABIC' in name:
            script = 'Arabic'
        elif 'CJK' in name or 'IDEOGRAPH' in name or 'HAN' in name:
            script = 'Chinese/CJK'
        elif 'CYRILLIC' in name:
            script = 'Cyrillic'
        elif 'LATIN' in name:
            script = 'Latin'
        elif 'TAMIL' in name:
            script = 'Tamil'
        elif 'BENGALI' in name:
            script = 'Bengali'

        if script and script not in seen:
            seen.add(script)
            scripts.append(script)

    return scripts


def validate_ua_email(email: str) -> dict:
    normalized_input = unicodedata.normalize('NFC', email.strip())
    local_part, separator, domain_part = normalized_input.partition('@')
    scripts = detect_scripts(normalized_input)
    warnings = []

    if len(scripts) > 1:
        warnings.append('Mixed scripts detected')

    if not separator or not local_part or not domain_part:
        return {
            'valid': False,
            'normalized_email': normalized_input,
            'requires_smtputf8': any(ord(character) > 127 for character in normalized_input),
            'ace_domain': None,
            'scripts': scripts,
            'warnings': warnings,
            'error': 'Invalid email format',
        }

    try:
        validated = validate_email(
            normalized_input,
            allow_smtputf8=True,
            check_deliverability=False,
        )
        normalized_email = getattr(validated, 'normalized', None) or getattr(validated, 'email', None) or normalized_input
        domain = getattr(validated, 'domain', None) or domain_part

        try:
            ace_domain = idna.encode(domain, uts46=True).decode()
        except idna.IDNAError:
            ace_domain = domain

        requires_smtputf8 = any(ord(character) > 127 for character in normalized_email)

        return {
            'valid': True,
            'normalized_email': normalized_email,
            'requires_smtputf8': requires_smtputf8,
            'ace_domain': ace_domain,
            'scripts': scripts,
            'warnings': warnings,
        }
    except EmailNotValidError as error:
        try:
            ace_domain = idna.encode(domain_part, uts46=True).decode()
        except idna.IDNAError:
            ace_domain = domain_part

        return {
            'valid': False,
            'normalized_email': normalized_input,
            'requires_smtputf8': any(ord(character) > 127 for character in normalized_input),
            'ace_domain': ace_domain,
            'scripts': scripts,
            'warnings': warnings,
            'error': str(error),
        }