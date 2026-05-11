# Next Template

A modern Next.js project template with best practices and conventions.

## Table of Contents

- [Getting Started](#getting-started)
- [File Naming](#file-naming)
- [Translations](#translations)
- [Working on the APIs](#working-on-the-apis)
- [Theming](#theming)
- [Auth](#auth)
- [Forms](#form-validation)
- [How to add new page step by step](#how-to-add-new-page-step-by-step)
- [Before Commit](#before-commit)
- [Table](#table)

## Getting Started

1. Clone the repository
2. Install the [extensions](.vscode\extensions.json) for the project in VS Code
3. Set the environment variables in the [.env](.env) file, needed variables are described in the [.env.example](.env.example) file.
4. Run `npm install` to install the dependencies
5. Run `npm run dev` to start the development server

## File Naming

- **Components:** kebab-case (e.g., user-card.tsx)
- **Hooks should:** kebab-case with use prefix (e.g., use-user-data.ts)
- **Utilities:** kebab-case (e.g., format-date.ts)
- **Types:** kebab-case with .d.ts extension (e.g., user.d.ts)
- **Pages:** kebab-case for routes (e.g., user-profile/page.tsx)
- **Stores:** kebab-case with -store suffix (e.g., users-store.ts)

## Translations

Translations are stored in the `src/i18n/messages` folder.
The translations are stored in the [ar.json](src/i18n/messages/ar.json) and [en.json](src/i18n/messages/en.json) files.

### To check for the messages that is not used or not added, run the following command:

```bash
npx @lingual/i18n-check@latest --source Ar --locales ./src/i18n/messages --unused ./src/ -f next-intl
```

## Working on the APIs

To generate the API types, run the following command:

```bash
npm run generate-apis-types
```

The API types are generated in the `src/types/apis-types.ts` file then used by the client in the [api.tsx](src/configs/api.tsx) file where we handle apis client depending on role (Admin or Client or No Auth).

after that you can use the api generated from the backend like this:

```tsx
import { Client } from "src/configs/api";

const { data } = await Client.admin().auth.login({
  body: {
    email: "test@example.com",
    password: "password",
  },
});
```

see [LoginForm](src/app/[locale]/auth/login/components/login-form.tsx) component.

additional to that we export some important variables from the same file [api.tsx](src/configs/api.tsx) to use them in the client side.

```tsx
// the public url of the frontend
export const ClientPublic = env.NEXT_PUBLIC_FRONTEND_URL;
// the backend url hostname (without the /api part)
export const BaseUrl = env.NEXT_PUBLIC_BACKEND_URL;
// the backend url (with the /api part)
export const ApiBaseUrl = BaseUrl;
// the image base url (with the /public part)
export const ImageBaseUrl = `${BaseUrl}/public`;
// method to get the token
export const getToken
```

## Theming

We use shadcn default theming and next-themes for them context and we have a store to manage the theme and the colors, then set them as `hsl` like `--primary: hsl(var(--primary))` in the `:root` element directly see [them-store](src\store\theme-store.ts).

## Auth

We use the `auth` object to store the token in the local storage or session storage depending on the remember me checkbox.

```tsx
export const auth = {
  admin: "a_accessToken",
  user: "u_accessToken",
} as const;
```

see [api.tsx](src/configs/api.tsx) file.

we check on every page inside the [AuthGuard](src/components/guards/auth-guard.tsx) component if the token is valid and if not we redirect to the login page.

for permissions we generate the permissions file using the following command:

```bash
npm run generate-permissions
```

the permissions file is generated in the [all-permissions.ts](src/configs/all-permissions.ts) file.

then in the pages we check is the user has the permission to access the page using permissions methods in the [use-user-store.ts](src/store/use-user-store.ts) file.

## Forms

We use custom form builder component that we made to build the forms and validate the data using zod and react-hook-form, see this [example](src/components/FormBuilder/example.tsx) component.

and there is a [form-dialog](src/components/dialog/form-dialog.tsx) component to build the forms in a dialog and validate the data using zod and react-hook-form, see this [example](src/components/dialog/form-dialog-example.tsx) component.

## How to add new page step by step:

1. create a new folder for the page in the [app](src/app) folder and make it server component and add metadata for the page like title, description, keywords, etc like in [users-page](<src/app/[locale]/(dashboard)/settings/users/page.tsx>) page.
2. add the page to the [routing.ts](src/i18n/routing.ts) file.
   so it appear in the routeing suggestions and the routes keep to be typed and validated.
3. if it inside the dashboard add the page to the [menu-list.tsx](<src/app/[locale]/(dashboard)/components/sidebar/menu-list.tsx>) component.
   use [iconify](https://icon-sets.iconify.design/) icons for the page icon.
4. if it is new model create a new store in the [models](src/store/models/) folder and add all the actions you need see [users-store](src/store/models/users-store.ts) as an example or if it existed before use the existing store.
5. if it needs form or form dialog add it like in [add-update-user.tsx](<src/app/[locale]/(dashboard)/settings/users/components/add-update-users.tsx>) component.
6. if it needs table add it like in [users-table.tsx](<src/app/[locale]/(dashboard)/settings/users/components/users-table.tsx>) component.
7. add view dialog to view all the data in buetiful way like in [view-user.tsx](<src/app/[locale]/(dashboard)/settings/users/components/view-user.tsx>) component.
8. **for the page to be ready and fully tested, you need to test this:**

- all the texts is translated.
- it works on dark and light mode.
- the from is validating on change and showing correct error messages and loading when submitting.
- the table columns that have complex data is viewed in the correct way (like view dialog when it is needed or date to be formatted in needed format ...etc)
- permissions are set correctly and the page is not accessible to the users that not have the permission and actions are hidden when the user don't have permission to do that action.
- **if it page with table:**
  - all columns in table are sorted and filtered and the once that not support that to disable sorting or filtering on them.
  - if it table all the data needs to be viewed by default and user can hide what he don't need to see.
  - actions are at the first column of the table.
  - all action icons has title or tooltip to show what it does.
  - you added correct sizes and colors for columns which needs it.

## Before Commit

- insure that there is no problem in build by running `npm run build`.
- insure there is no lint run `npm run lint` then fix the linting errors.
- use short commit message and keep it descriptive.
- make sure all files are formatted using this command `npm run prettier --check .`.

## Table

We use custom table component that we made to build the tables, this table is build to work exactly with our backend architecture with dynamic filters, sorting and pagination.

### filters

we have the filter helper utility to help manage the filters and build the filters query string see [filter-helper](src\components\tanstack-table\lib\filter-helper.ts) file.
