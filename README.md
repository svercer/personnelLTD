# PersonnelLTD

CSV upload and read data
## Installation

Download the project or clone in to your local machine

```bash
git clone https://github.com/svercer/personnelLTD
```

Navigate to project folder

```bash
cd "project name"
```
Install composer and npm 

```bash
composer install 
```

```bash
npm install 
```
Create a database on your local machine

## Configure .ENV 

Create a copy from .env.example

```bash
cp .env.example .env 
```
Generate project key

```bash
php artisan key:generate
```
Set Database Credentails


```bash
DB_DATABASE=personnelLTD
DB_USERNAME=root
DB_PASSWORD= 
```
Run migrations
```bash
php artisan migrate 
```

## Usage 

```bash
npm run dev
```
```bash
php artisan serve --host=localhost
```
