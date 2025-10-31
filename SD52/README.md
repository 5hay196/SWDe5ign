# SD52 - Secure Data Structure

## Overview
SD52 is a secure file system structure for managing sensitive data, configurations, and backups for the SWDe5ign project.

## Directory Structure

```
SD52/
├── config/         # Configuration files (restricted access)
├── data/           # Application data (protected)
├── logs/           # System and application logs
├── backups/        # Automated backups (read-only for most users)
├── secure/         # Highly sensitive data (encrypted, minimum access)
└── README.md       # This file
```

## Security Model

### Permission Levels
- **config/**: 750 (owner: rwx, group: r-x, others: ---)
- **data/**: 770 (owner: rwx, group: rwx, others: ---)
- **logs/**: 755 (owner: rwx, group: r-x, others: r-x)
- **backups/**: 700 (owner: rwx, group: ---, others: ---)
- **secure/**: 700 (owner: rwx, group: ---, others: ---)

### Access Control
1. **config/**: Store application settings, API keys (encrypted), database credentials
2. **data/**: Regular application data, user uploads, cached content
3. **logs/**: Error logs, access logs, audit trails
4. **backups/**: Automated snapshots, database dumps, file archives
5. **secure/**: Encryption keys, certificates, highly sensitive credentials

## Usage

### Configuration Files
Place configuration files in `config/`:
```bash
SD52/config/
├── database.conf
├── api_keys.enc
└── app_settings.json
```

### Data Storage
Store application data in `data/`:
```bash
SD52/data/
├── uploads/
├── cache/
└── temp/
```

### Logging
All logs go to `logs/`:
```bash
SD52/logs/
├── error.log
├── access.log
└── audit.log
```

### Backups
Automated backups stored in `backups/`:
```bash
SD52/backups/
├── daily/
├── weekly/
└── monthly/
```

### Secure Storage
Critical secrets in `secure/`:
```bash
SD52/secure/
├── ssl/
│   ├── private.key
│   └── certificate.crt
└── keys/
    └── master.key
```

## Security Best Practices

1. **Never commit `secure/` or sensitive `config/` files to git**
2. **Encrypt all sensitive data before storing**
3. **Use environment variables for runtime secrets**
4. **Rotate credentials regularly**
5. **Audit access logs frequently**
6. **Backup critical data daily**
7. **Test restore procedures monthly**

## Encryption

### Recommended Tools
- **GPG**: For file encryption
- **OpenSSL**: For certificate management
- **age**: Modern encryption tool

### Example: Encrypt a file
```bash
gpg --encrypt --recipient your@email.com config/api_keys.json
```

### Example: Decrypt a file
```bash
gpg --decrypt config/api_keys.json.gpg > config/api_keys.json
```

## Backup Strategy

### Automated Backups
```bash
# Daily backup script (add to cron)
tar -czf SD52/backups/daily/backup-$(date +%Y%m%d).tar.gz SD52/data/

# Weekly backup
tar -czf SD52/backups/weekly/backup-$(date +%Y%W).tar.gz SD52/data/ SD52/config/

# Monthly full backup
tar -czf SD52/backups/monthly/backup-$(date +%Y%m).tar.gz SD52/
```

## Monitoring

### Log Rotation
Configure logrotate for automatic log management:
```
/home/swdev/Documents/SWDe5ign/SD52/logs/*.log {
    daily
    rotate 7
    compress
    missingok
    notifempty
}
```

## Emergency Procedures

### Data Loss
1. Check `backups/` for recent snapshots
2. Restore from most recent valid backup
3. Verify data integrity
4. Document incident in `logs/incident.log`

### Security Breach
1. Immediately revoke compromised credentials
2. Audit `logs/access.log` for suspicious activity
3. Rotate all keys in `secure/`
4. Update `config/` with new credentials
5. Document in `logs/security.log`

## Maintenance

### Daily
- [ ] Check log files for errors
- [ ] Verify backup completion
- [ ] Monitor disk space

### Weekly
- [ ] Review access logs
- [ ] Test backup restore
- [ ] Clean old log files

### Monthly
- [ ] Rotate credentials
- [ ] Security audit
- [ ] Update documentation

## Integration with SWDe5ign

The SD52 structure integrates with the main SWDe5ign project:
- Configuration for deployment
- Secure storage for API keys
- Backup of website content
- Logging for analytics

## Contact

For security concerns or questions, contact the system administrator.

---

**Last Updated**: 2025-10-31
**Version**: 1.0.0
