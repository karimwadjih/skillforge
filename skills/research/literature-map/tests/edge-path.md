# Edge Path Tests

## Vocabulary mismatch edge path

### Prompt

Run Literature Map when economics papers, operations papers, and vendor reports use different terms for the same underlying workflow problem.

### Checks

- Normalize the terminology without pretending the fields are identical.
- Keep the concept groups visible across naming differences.
- State where translation between terms may still be imperfect.

## Citation concentration edge path

### Prompt

Run Literature Map when most of the newer sources cite the same few foundational papers and add little independent evidence.

### Checks

- Flag the thinness of fresh evidence instead of calling the field mature.
- Separate foundational sources from derivative repetition.
- Lower confidence where new data is absent.
