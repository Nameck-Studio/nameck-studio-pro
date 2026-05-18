# Security Auditor

> Adapted from [security-auditor](https://github.com/sickn33/antigravity-awesome-skills/tree/main/skills/security-auditor) (MIT License)

Expert security auditor specializing in application security, DevSecOps, and secure coding practices.

## When to Use

- Running security audits or risk assessments
- Reviewing SDLC security controls
- Investigating vulnerabilities or designing mitigation plans
- Validating authentication, authorization, and data protection controls
- Reviewing API endpoints for security issues

## Do Not Use When

- You lack authorization for security testing
- You need legal counsel or formal compliance certification
- You only need a quick automated scan

## Security Review Process

1. Confirm scope, assets, and compliance requirements
2. Review architecture, threat model, and existing controls
3. **Trace Data Flow**: Follow data from entry points (UI/API) through middleware to storage
4. **Adversarial Analysis**: For every feature, ask "How can this be exploited?"
5. Run targeted scans and manual verification for high-risk areas
6. Prioritize findings by severity and business impact
7. Validate fixes and document residual risk

## OWASP Top 10 Checklist

### 1. Broken Access Control
- [ ] Every endpoint checks authentication
- [ ] Authorization verified on every request (not just UI)
- [ ] IDOR prevention: verify ownership on update/delete
- [ ] Role-based access properly enforced

### 2. Cryptographic Failures
- [ ] Passwords hashed with bcrypt (never plaintext)
- [ ] Sensitive data encrypted at rest and in transit
- [ ] No secrets in frontend code or git history
- [ ] Proper TLS configuration

### 3. Injection
- [ ] Parameterized queries (Drizzle ORM handles this)
- [ ] Input validation on all user inputs
- [ ] Output encoding for XSS prevention
- [ ] No dynamic SQL construction

### 4. Insecure Design
- [ ] Threat modeling completed
- [ ] Security requirements documented
- [ ] Rate limiting on authentication endpoints
- [ ] Account lockout policies

### 5. Security Misconfiguration
- [ ] CORS properly configured (not `*` in production)
- [ ] Security headers set (CSP, HSTS, X-Frame-Options)
- [ ] Default credentials removed
- [ ] Error messages don't leak implementation details

### 6. Vulnerable Components
- [ ] Dependencies regularly updated
- [ ] `npm audit` shows no critical vulnerabilities
- [ ] No known-vulnerable packages

## Project-Specific Security Rules

### Frontend
- Never expose API keys in frontend code
- Use `httpOnly` cookies for auth tokens (not localStorage)
- Sanitize all user inputs before rendering
- Set proper CSP headers

### Backend (Express API)
- Validate all inputs server-side with schema validation
- Use parameterized queries (Drizzle ORM)
- Set proper CORS configuration (specific origins, not `*`)
- Rate limit auth endpoints
- Hash passwords with bcrypt (cost factor ≥ 10)
- Use JWT with proper expiration and signing

### Database
- No raw SQL — use Drizzle ORM exclusively
- Validate foreign key constraints
- No sensitive data in logs

## Secure Coding Standards

- Input validation at system boundaries
- Parameterized queries always
- Output encoding for HTML context
- Security headers on all responses
- Principle of least privilege
- Fail securely without information leakage

## Limitations

- This is a checklist and guidelines skill, not a penetration testing tool.
- Do not run intrusive tests in production without written approval.
- Protect sensitive data and avoid exposing secrets in reports.
