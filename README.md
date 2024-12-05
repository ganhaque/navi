# Github Links
- Application user interface
  - https://github.com/ganhaque/navi
- Data scraper/generator
  - https://github.com/ganhaque/booklet_data_generator

The database file is in the data folder (`./data/booklet.db`).

# Instruction

## Application
Make sure `Node` is installed and `npm` is available in the command line.

```bash
# git clone the navi repo & cd into it
git clone https://github.com/ganhaque/navi.git && cd navi

# install dependencies
npm install

# run it
npm run dev

# go to `localhost:3000` in your browser by manually entering it or by clicking the link given
```

## Data scraper
Make sure `node` and `rust` is installed. `npm` and `cargo` should be available in the command line.

```bash
# cd into the directory
cd data/booklet_data_generator

# scrape the data and wait for the output json file
npm scrape.js

# execute the rust parser to generate a .db file in the parent directory 
# NOTE: this will replace the .db file, not update it
cargo run
```

# Test Queries
There is a `test_queries.sql` in the `data` folder, which can be executed by
```bash
sqlite3 --column --header booklet.db < test_queries.sql
```


