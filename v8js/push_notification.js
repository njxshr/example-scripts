// This script uses a pre-configured push notification service to send notifications when new records are created.
// lodash.min.js is available by default. The file is located in storage/scripting directory of the DreamFactory installation.
// You can add your own scripts there and use require() to include them.

// POST /api/v2/db/_table/todo triggers script db._table.todo.post.post_process
// This script runs AFTER records are written to the db.
// records are in array event.request.payload.resource.

var lodash = require("lodash.min.js");

if (event.request.payload.resource) {

    lodash._.each(event.request.payload.resource, function( record ) {

        var msg = {
            "Message": {
                "default": "A new Todo named '" + record.name + "' was just created!"
            },
            "Subject": "New Todo Created"
        }

        // service name is 'push', push to SNS topic by name
        var result = platform.api.post("push/topic/642246745556:test_topic", msg);

        // output result to storage/logs/dreamfactory.log
        var_dump(result);
    });
}
