const meow = require('meow');

const cli = meow(`
    Usage
    $ tb [<options> ...]

    Options
        none             Display board view
      --archive, -a      Display archived items
      --begin, -b        Start/pause task
      --check, -c        Check/uncheck task
      --clear            Delete all checked items
      --copy, -y         Copy item description
      --delete, -d       Delete item
      --edit, -e         Edit item description
      --find, -f         Search for items
      --help, -h         Display help message
      --list, -l         List items by attributes
      --move, -m         Move item between boards
      --note, -n         Create note
      --priority, -p     Update priority of task
      --restore, -r      Restore items from archive
      --star, -s         Star/unstar item
      --task, -t         Create task
      --timeline, -i     Display timeline view
      --version, -v      Display installed version

    Examples
      $ tb
      $ tb --archive
      $ tb --begin 2 3
      $ tb --check 1 2
      $ tb --clear
      $ tb --copy 1 2 3
      $ tb --delete 4
      $ tb --edit @3 Merge PR #42
      $ tb --find documentation
      $ tb --list pending coding
      $ tb --move @1 cooking
      $ tb --note @coding Mergesort worse-case O(nlogn)
      $ tb --priority @3 2
      $ tb --restore 4
      $ tb --star 2
      $ tb --task @coding @reviews Review PR #42
      $ tb --task @coding Improve documentation
      $ tb --task Make some buttercream
      $ tb --timeline
`, {
    flags: {
        help: {
            type: 'boolean',
            alias: 'h'
        },
        version: {
            type: 'boolean',
            alias: 'v'
        },
        archive: {
            type: 'boolean',
            alias: 'a'
        },
        restore: {
            type: 'boolean',
            alias: 'r'
        },
        task: {
            type: 'boolean',
            alias: 't'
        },
        note: {
            type: 'boolean',
            alias: 'n'
        },
        delete: {
            type: 'boolean',
            alias: 'd'
        },
        check: {
            type: 'boolean',
            alias: 'c'
        },
        begin: {
            type: 'boolean',
            alias: 'b'
        },
        star: {
            type: 'boolean',
            alias: 's'
        },
        copy: {
            type: 'boolean',
            alias: 'y'
        },
        timeline: {
            type: 'boolean',
            alias: 'i'
        },
        priority: {
            type: 'boolean',
            alias: 'p'
        },
        find: {
            type: 'boolean',
            alias: 'f'
        },
        list: {
            type: 'boolean',
            alias: 'l'
        },
        edit: {
            type: 'boolean',
            alias: 'e'
        },
        move: {
            type: 'boolean',
            alias: 'm'
        },
        clear: {
            type: 'boolean'
        }
    }
});

console.log(cli.input, cli.flags);
