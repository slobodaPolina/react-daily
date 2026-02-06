# React-based Daily tasks application

Uses React, TypeScript, Redux, Mantine, SCSS, Vitest, Vite, AWS

## Description

The application contains the calendar for the current month with the planned tasks displayed

User also can see the tasks for the specific day

The built app is located [here](https://d153lqu4o28h2l.cloudfront.net/)

## Install

`npm install`

## Run locally

`npm run dev`

## CI

Documentation for the actions used:
[checkout](https://github.com/actions/checkout);
[setup-node](https://github.com/actions/setup-node)

### Check (on any push)

On push to any branch, the code is built and checked against unit tests and linter rules

### Deploy (on master update)

Deployment process includes pushing dist to AWS S3, then invalidating AWS CloudFront distribution, so the updates are synced.

To make this workflow work, you have to provide AWS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_BUCKET and AWS_CLOUD_FRONT_DISTRIBUTION values into github's project's settings -> secrets and variables -> actions -> new repository secret

Documentation for the actions used:
[deployment-action](https://github.com/marketplace/actions/deployment-action);
[upload-s3](https://github.com/marketplace/actions/upload-s3);
[invalidate-aws-cloudfront](https://github.com/marketplace/actions/invalidate-aws-cloudfront);
[deployment-status](https://github.com/marketplace/actions/deployment-status)
