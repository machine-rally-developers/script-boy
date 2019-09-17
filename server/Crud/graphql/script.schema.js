const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLNonNull,
    GraphQLString,
    GraphQLBoolean,
    GraphQLSchema,
    GraphQLError,
    GraphQLList,
    GraphQLInt

} = graphql;
const scriptRead = require("../script/read");
const scriptCreate = require("../script/create");
const scriptDelete = require("../script/delete");
const scriptUpdate = require("../script/update");

const scriptType = new GraphQLObjectType({
    name: 'script',
    fields: () => ({
        _id: {
            type: GraphQLID
        },
        type: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        data: {
            type: GraphQLString
        },

    })

})
const addScript = {
    type: scriptType,
    args: {
        type: {
            type: new GraphQLNonNull(GraphQLString)
        },
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        data: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    async resolve(parent, args) {
        let data = {
            type: args.type,
            name: args.name,
            data: args.data
        }
        try {
            let result = await scriptCreate(data);
            return result
        } catch (e) {
            return new GraphQLError(e)
        }


    }
}
const deleteScript = {
    type: scriptType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },

    },
    async resolve(parent, args) {
        try {
            let result = await scriptDelete(args.id);
            return result
        } catch (e) {
            return new GraphQLError(e)
        }

    }
}
const updateScript = {
    type: scriptType,
    args: {
        type: {
            type: new GraphQLNonNull(GraphQLString)
        },
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        data: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve(parent, args) {
        return "To Do"
    }
}


const scriptRootQuery = {
    type: new GraphQLList(scriptType),
    args: {
        id: {
            type: GraphQLID
        }
    },
    async resolve(parants, args) {
        if (args.id != "") {
            let result = await scriptRead({
                "_id": args.id
            })
            return result;
        } else {


            let result = await scriptRead({});
            console.log(result)
            return result

        }

    }
}

module.exports = {
    scriptType,
    scriptRootQuery,
    updateScript,
    deleteScript,
    addScript
}