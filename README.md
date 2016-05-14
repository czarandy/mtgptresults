# MTG PT Results

A static site showing results for every MTG Pro Tour (as much as I've been able to find). The display code is fairly simple--most of the work was in data gathering.

## Contributing

The site loads all data statically from three data files: `players.json`, `recent.json`, and `tournaments.json`. These are used for the three types of views: player, recent (the initial page showing tournament summaries), and tournament. If you want to add more tournaments or correct any data, make your desired changes in the `data` folder.

1. [Fork this repository](https://help.github.com/articles/fork-a-repo/).
2. Edit `tournaments.json` and `recent.json`.
3. Commit your changes to your fork. Write [good commit messages](https://github.com/erlang/otp/wiki/writing-good-commit-messages).
4. [Submit a pull request](https://help.github.com/articles/using-pull-requests/).

NB: `players.json` is generated automatically and does not need to be changed.

## Development

### Prerequisites

* [node.js](https://nodejs.org/en/)
* [Grunt](http://gruntjs.com/getting-started)
* [Ruby](https://www.ruby-lang.org/en/documentation/installation/)

### Installation

Install dependencies:

    $ npm install

### Build

Create a local build:

    $ grunt default

### Preview

Run a simple HTTP server in the build folder, e.g:

    $ cd build && python -m SimpleHTTPServer
