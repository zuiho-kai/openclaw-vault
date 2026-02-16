# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2026-02-17

### Changed
- Updated documentation to clearly state plain text storage
- Removed misleading "encryptionEnabled" config option (was not implemented)
- Added explicit security warnings about appropriate use cases
- Changed description from "secure" to "simple" password storage

### Security
- Clarified that this plugin uses plain text storage
- Added warnings about not using for production/sensitive credentials
- Recommended proper password managers for high-value secrets

## [1.0.0] - 2026-02-17

### Added
- Initial release
- Password storage and retrieval
- Commands: set, show, remove, list
- JSON-based local storage
- Automatic timestamp tracking (created/updated)
- Basic configuration support

### Security
- Plain text storage (encryption planned for future release)
- Local file system storage in user home directory
