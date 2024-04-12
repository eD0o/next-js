# 7 - Final

## 7.1 - Deploy

To deploy your next.js application, you have to:

- **Build** your project using: ``yarn build / npm run build``.
- **Use a node.js server**, in this case can be Vercel.
- Link the github and its repo (it needs to be in the main branch) with your Vercel account.
- It's possible to install some plugins and use some DevOps in the Vercel website for your hosting.

> You can use (secret) local environment variables for your code creating a .env.local file.

## 7.2 - Conclusion

- Be careful mixing Back-end with Front-end in Next.js, it's possible, but understand that is risky when the project gets more scalable. It's more flexible to have these stacks divided.