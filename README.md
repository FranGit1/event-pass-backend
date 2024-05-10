# NestJS Template

## Migrations

### Generate (create)

npm run migration:generate "src/migrations/add-example-entity"

### Execute Up (execute)

npm run migration:up

### Execute Down (revert)

npm run migration:down

### Show status of migrations (what was and shall be executed)

npm run migration:show

### Show migration log (what is to be generated)

npm run migration:log

## Upcoming features:

- application errors/message keys
- error logging
- script/command cli executor
- cloudformation / terraform
  - eb dev prod
  - codepipeline
    1. gitlab - conn?
    2. codebuild
    3. codedeploy - eb
- rds
- nest scafold commands - npm scripts ?
  - idealno odmah extend raditi etc.
