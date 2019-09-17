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
const kvmRead = require("../kvm/read");
const kvmCreate = require("../kvm/create");
const kvmDelete = require("../kvm/delete");
const kvmType = new GraphQLObjectType({
    name: 'kvm',
    fields: () => ({
        _id: {
            type: GraphQLID
        },
        key: {
            type: GraphQLString
        },
        value: {
            type: GraphQLString
        },
        encrypted: {
            type: GraphQLBoolean
        }
    })
})


const kvmRootQuery = {
    type: new GraphQLList(kvmType),
    args: {
        id: {
            type: GraphQLID
        }
    },
    async resolve(parants, args) {
        if (args.id != "") {
            let result = await kvmRead({
                "_id": args.id
            })
            return result;
        } else {


            let result = await kvmRead({});
            console.log(result)
            return result

        }

    }
}

const addKvm = {
    type: kvmType,
    args: {
        key: {
            type: new GraphQLNonNull(GraphQLString)
        },
        value: {
            type: new GraphQLNonNull(GraphQLString)
        },
        encrypted: {
            type: GraphQLBoolean
        }
    },
    async resolve(parent, args) {
        let data = {
            key: args.key,
            value: args.value,
            encrypted: args.encrypted
        }
        try {
            let result = await kvmCreate(data);
            return result
        } catch (e) {
            return new GraphQLError(e)
        }


    }
}
const deleteKvm = {
    type: kvmType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },

    },
    async resolve(parent, args) {
        try {
            let result = await kvmDelete(args.id);
            return result
        } catch (e) {
            return new GraphQLError(e)
        }

    }
}
const updateKvm = {
    type: kvmType,
    args: {
        key: {
            type: new GraphQLNonNull(GraphQLString)
        },
        value: {
            type: new GraphQLNonNull(GraphQLString)
        },
        encrypted: {
            type: GraphQLBoolean
        }
    },
    resolve(parent, args) {
        let data = {
            key: args.key,
            value: args.value,
            encrypted: args.encrypted
        }
        try {
            return "To do"
        } catch (e) {
            return new GraphQLError(e)
        }


    }
}


module.exports = {
    kvmType,
    kvmRootQuery,
    addKvm,
    deleteKvm,
    updateKvm
}