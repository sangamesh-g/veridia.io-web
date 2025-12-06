# Dummy Data Fixtures

This directory contains CSV files with dummy data that can be loaded into the database.

## Files

- **departments.csv** - Department information
- **positions.csv** - Job positions with department references
- **applicants.csv** - Applicant user accounts
- **applications.csv** - Job applications

## Usage

### Load data into database:

```bash
docker-compose exec backend python manage.py create_dummy_data
```

### Clear existing data and reload:

```bash
docker-compose exec backend python manage.py create_dummy_data --clear
```

## CSV File Formats

### departments.csv
- `name` (required): Department name
- `description` (optional): Department description

### positions.csv
- `title` (required): Position title
- `department` (required): Must match a department name from departments.csv
- `description` (optional): Position description
- `is_active` (optional): true/false, defaults to true

### applicants.csv
- `email` (required): Unique email address
- `first_name` (required): First name
- `last_name` (required): Last name
- `phone` (required): Phone number
- `user_type` (optional): Defaults to "applicant"
- `is_verified` (optional): true/false, defaults to true

**Note:** All applicants will have password set to `password123` by default.

### applications.csv
- `applicant_email` (required): Must match an email from applicants.csv
- `position` (required): Position title
- `department` (required): Department name
- `status` (required): One of: under-review, interview-scheduled, accepted, rejected
- `experience` (optional): Years of experience
- `expected_salary` (optional): Expected salary
- `skills` (optional): Comma-separated skills
- `education` (optional): Education level
- `interview_date` (optional): Number of days from now (e.g., 5 = 5 days from now)

## Viewing Data in Django Admin

After loading the data, you can view and manage it in Django Admin:

- Departments: `/admin/applications/department/`
- Positions: `/admin/applications/position/`
- Applications: `/admin/applications/application/`
- Users: `/admin/users/user/`
- Activities: `/admin/applications/activity/`
- Status History: `/admin/applications/statushistory/`

## Editing Data

You can edit the CSV files directly and reload the data using the `--clear` flag to replace existing data.

**Important:** When editing CSV files:
- Keep the header row
- Use proper CSV escaping for fields containing commas (wrap in quotes)
- Ensure foreign key references match (e.g., department names in positions.csv must exist in departments.csv)
- Empty fields should be left empty (not "N/A" or similar)

