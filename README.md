# Blog Breeze

A modern, user-friendly blogging platform built with React (Vite), Redux, and Appwrite. Share ideas, stories, and expertise effortlessly!

🔗 App Link: https://blogbreeze.shubhamprakash681.in/

## Features

✅ **Seamless Blog Sharing** – Post, discover, and engage with content.

✅ **Rich Text Editor** – Powered by TinyMCE for beautifully formatted posts.

✅ **Privacy Control** – Mark blogs as _public_ or _private_ to show/hide from audiences.

✅ **Category System** – Organize posts with custom categories for better discoverability.

✅ Dark/Light Mode - Eye-friendly theme options

✅ **User Profiles** – Personalize your blogging identity.

✅ **Clean, Responsive UI** – Works perfectly on all devices. Intuitive and easy-to-use interface.

## How to Use BlogBreeze 🚀

### For Readers 📖

1.**Create an Account**

- Click "Sign Up" in top-right corner
- Enter email and password

2.**Browse Public Blogs**

- Visit the [homepage](https://blogbreeze.shubhamprakash681.in/)
- Scroll through latest posts or click on any of the category
- Click on any blog to read full content

### For Writers ✍️

1.**Create an Account**

- Click "Sign Up" in top-right corner
- Enter email and password

2.**Write Your First Blog**

- Click "Add Post" Button
- Add title and select category
- Use the rich text editor to format content:
  - Bold/italic text
  - Add headers
  - Insert images/links
- Set visibility:
  - 🌍 Public (visible to all)
  - 🔒 Private (only you can see)
- Click "Submit" when ready

3.**Manage Your Blogs**

- View all your posts in "My Posts" section
- Edit/delete existing posts
- Change visibility anytime

### Tips 💡

- Use relevant categories for better reach
- Save drafts as Private before publishing
- Format posts for better readability

## Tech Stack 🛠️

### Frontend

| Technology                                                                                                              | Purpose          | Version |
| ----------------------------------------------------------------------------------------------------------------------- | ---------------- | ------- |
| ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)                     | UI Framework     | 18+     |
| ![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)                        | Build Tool       | 6+      |
| ![Redux Toolkit](https://img.shields.io/badge/Redux-Toolkit-593D88?style=for-the-badge&logo=redux&logoColor=white)      | State Management | 2+      |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) | Styling          | 3+      |
| ![TinyMCE](https://img.shields.io/badge/TinyMCE-339933?style=for-the-badge&logo=tinymce&logoColor=white)                | Rich Text Editor | 7+      |

### Backend & Infrastructure

| Technology                                                                                                  | Purpose         | Version |
| ----------------------------------------------------------------------------------------------------------- | --------------- | ------- |
| ![Appwrite](https://img.shields.io/badge/Appwrite-F02E65?style=for-the-badge&logo=appwrite&logoColor=white) | Backend Service | 1.3+    |

### Development & Deployment

| Technology                                                                                                  | Purpose         |
| ----------------------------------------------------------------------------------------------------------- | --------------- |
| ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)                | Version Control |
| ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)       | Hosting         |
| ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)       | Code Linting    |
| ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black) | Code Formatting |

## Installation & Setup

Clone the repository:

```bash
    git clone https://github.com/shubhamprakash681/blog-breeze.git
```

Navigate to the project directory:

```bash
    cd blog-breeze
```

Install dependencies:

```bash
  npm install
```

Add Environment Variables

- Copy all variables from .env.sample to a new .env file
- Fill in your Appwrite credentials:

```bash
    VITE_APPWRITE_URL=''
    VITE_APPWRITE_PROJECT_ID=''
    VITE_APPWRITE_DATABASE_ID=''
    VITE_APPWRITE_COLLECTION_ID=''
    VITE_APPWRITE_BUCKET_ID=''
```

Run the development server:

```bash
  npm run dev
```

Open in browser:

```bash
  http://localhost:5173/
```

## Contributing

Contributions are always welcome!

## Deployment

This project is deployed using Vercel.

## License

[Gnu Public License v3](https://choosealicense.com/licenses/gpl-3.0/)
