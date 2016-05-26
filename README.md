# MTG PT Results

A static site showing results for every MTG Pro Tour (as much as we've been able
to find). The display code is fairly simple – most of the work was in data
gathering.

## Contributing

We are open for community contributions. You have multiple possibilities: 

* Tweet us [@mtgptresults](https://twitter.com/mtgptresults)
* [Raise an issue](https://github.com/czarandy/mtgptresults/issues)
* [Create a pull request](#pull-requests)

## Pull Requests

If you want to make any changes or corrections yourself make them to the files 
in the `data` directory. To add a new tournament, simply create a new file that 
matches the format of the existing files:

1. [Fork this repository](https://help.github.com/articles/fork-a-repo/).
2. Edit the appropriate file in the `data` directory.
3. Commit your changes to your fork. Write [good commit messages](https://github.com/erlang/otp/wiki/writing-good-commit-messages).
4. [Submit a pull request](https://help.github.com/articles/using-pull-requests/).

## Structure

The site loads all data from the `data` directory. From this it
generates the following derived views: 

* `players.js` 
* `recent.js` 
* `tournaments.js`

which correspond to the views for … 

* … player pages, 
* … the recent tournament view (the initial page that includes tournament 
summaries)
* … and the detailed tournament views.

## Development

### Prerequisites

* [node.js](https://nodejs.org/en/)
* [Grunt](http://gruntjs.com/getting-started)

### Installation

Install dependencies:

    $ npm install

### Build

Create a local build:

    $ grunt

### Preview

Start a local web server in the build folder:

    $ grunt serve

You can then test your changes in your browser, at `localhost:8000`.  
Once you have verified your change looks good, submit the pull request.
