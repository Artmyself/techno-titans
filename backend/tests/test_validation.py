import unittest

from ua_validator.core import validate_ua_email


class ValidationTests(unittest.TestCase):
    def test_internationalized_addresses_are_valid(self):
        result = validate_ua_email('राम@नेपाल.नेपाल')
        self.assertTrue(result['valid'])
        self.assertTrue(result['requires_smtputf8'])
        self.assertIn('Devanagari', result['scripts'])

    def test_ascii_address_is_valid(self):
        result = validate_ua_email('user@example.com')
        self.assertTrue(result['valid'])
        self.assertFalse(result['requires_smtputf8'])
        self.assertIn('Latin', result['scripts'])

    def test_invalid_address_is_rejected(self):
        result = validate_ua_email('invalid@@example.com')
        self.assertFalse(result['valid'])


if __name__ == '__main__':
    unittest.main()