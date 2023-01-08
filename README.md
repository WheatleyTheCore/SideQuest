# TrackIt

An app for data collection and visualization

## Development

### The Two Iterations

There are two folders in this repo, `first-iteration` and `second-try`. Each of these is a separate expo project, so to run either you must be inside their directory.

`first-iteration` is the first attempt at this project I made, and I keep it around for reference. It is very unfinished, and no longer under development. This version was written in JavaScript, as I was hoping I'd progress faster than if I used TypeScript. 

`second-try` is where all the current development is happening. This one uses TypeScript, since I wanted to get some more experience with it.

### Steps to set up development enviornment

1. Clone the repository using `git clone git@github.com:WheatleyTheCore/TrackIt.git`
2. Enter the directory of whichever iteration you want to build.
3. Run `expo install` to install all dependencies. 
4. Run `expo start` to start the development server.
5. (Optional) open the app in Expo Go on an emulator or physical device (or use the web option, but I haven't tried that one).

### Current TODO
- Put together ListItem component in such a way that it can be reused, but without limiting its functionality.
- Put together the AddCollection and AddEntry screens so that the rest of the screens can have real data to display during development.

### The Data Model

***Collections*** are collections of data and are the actual items we are storing in memory. The key that we store it with is the name of the collection. They have a prototype attribute, which is a "dehydrated" version of an entry that we use to contruct new entries when needed. They also have an entries attribute, which is where we store the actual entries.

***Entries*** are stored as in array on our Collection object.

Here's what this all looks like as JSON:
Collection: {
    prototype {
        //prototype goes here
    },
    entries: [entries go here]
}

