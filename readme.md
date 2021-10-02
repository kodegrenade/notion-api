
# Notion Api

A simple blog application built on the notion api.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NOTION_TOKEN` { your notion api secret key }

`NOTION_DATABASE_ID` { the notion database you will be querying }

  
## Run Locally

Clone the project

```bash
  git clone https://github.com/kodegrenade/notion-api
```

Go to the project directory

```bash
  cd notion-api
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

  
## Usage/Examples

Open the url below on your broswer to access the available endpoints.

```
http://localhost/api-docs
```

  
## API Reference

#### Blog Posts

```http
  GET /api/v1/blog/posts
```

#### Create Blog Post

```http
  POST /api/v1/create/post
```

| Parameter     | Type     | Description                          |
| :------------ | :------- | :----------------------------------- |
| `title`       | `string` | **Required**. Blog post title        |
| `tags`        | `array`  | **Required**. Blog post tags         |
| `content`     | `text`   | **Required**. Blog post content      |
| `author`      | `string` | **Required**. Blog post author       | 

#### Search Blog Post

```http
  POST /api/v1/blog/search
```
**PS:** Supports only search by title

| Parameter      | Type     | Description                          |
| :------------- | :------- | :----------------------------------- |
| `search`       | `string` | **Required**. Blog post title        |

## Todo
- Updating blog post
- Deleting blog post

## Contributing
Please feel free to fork this repo and contribute by submitting a pull request to enhance the functionalities.

## License

[MIT](https://choosealicense.com/licenses/mit/)

  
## Author

- [@kodegrenade](https://www.github.com/kodegrenade)

  