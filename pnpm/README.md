# PNPM vs NPM

NPM 

- puts everything all at the flat root level

PNPM

- provides it via symblinked 
- security/bugs concerned by laying it out in hierarchy based on dependencies. 
- you'll get 4x boost in performance


To install pnpm 
- pnpm 
- use pnpm env to then install node

`time npm install express`

time command is used to help measure time to install

`time pnpm add express`

time is in half

# to migrate from npm to pnpm

remove node_modules

`pnpm import`

this should do the migration for you. and will create a yaml file



## Other Notes

Composables are super helpful when you want to have shared functionality, not necessarily shared state. 

In the case of shared state, use Pinia instead
