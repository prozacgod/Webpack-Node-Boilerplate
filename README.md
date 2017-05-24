I wasn't entirely happy with some of the boilerplates that exist for
Node+ES6/ES7, this is a server-side builder for node js server utilities. has
jsx support wired in as well. (Although you'll need to add react or do more to
make it fully functional, the compiler just compiles it into
react.createcomponent code)

This also has an opinionated CONFIG global, so many of my server side projects
require a config of some sort, node.js configs naturally are just JS files that
get required in.  BUT webpack doesn't allow ignoring a single file.  It also
wouldn't fit within the es6 style, and can get in the way of isomorphic js
(browser and server)

I had a few options at my disposal but the one that felt the most correct, was
creating a global CONFIG variable as part of this environment. I place that into
each compiled file's header block - even though it's conditionally executed.

This means in the browser you can do
    <script> CONFIG={foo:1} </script>

And code will work as expected... on both client and sever side.  The server
will dyanmically load the config, the client expects the CONFIG to be defined
before being loaded.

On the client side, if you don't automatically create a CONFIG variable,
the client will attempt to execute a spurious "require" statement, with
obvious results.

Development
===

Start the watch tool with

    npm run watch


Then run the built code with

    npm run execute -- [args]

Deployment
===

Nothing has been done here yet

Build
===
If you just wish to build it

    npm run build
