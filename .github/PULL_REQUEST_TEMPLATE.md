## Summary

Describe what changed and why.

## Related issue

Closes #

## Verification

- [ ] `pnpm type-check`
- [ ] `pnpm build`
- [ ] Relevant workflow editing path tested manually
- [ ] English and Simplified Chinese strings updated when applicable
- [ ] Screenshots attached for visible UI changes

## Workflow model checklist

- [ ] Node IDs and `pid`/`next` links remain valid
- [ ] Exclusive gateways retain at least two branches and the final default branch
- [ ] Node deletion repairs links and validation errors
- [ ] Locale switching preserves user-edited node names
- [ ] No secrets, private workflow data, `dist/`, or unrelated generated files are included

## Security impact

Describe changes involving dependencies, workflow expressions, file access, network requests, credentials, GitHub Actions, or third-party code. Write `None` if not applicable.
