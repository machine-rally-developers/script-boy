const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLNonNull,
    GraphQLString,
    GraphQLBoolean,
    GraphQLSchema
} = graphql;
const {

    addKvm,
    deleteKvm,
    updateKvm,
    kvmRootQuery
} = require("./kvm.schema");
const {

    scriptRootQuery,
    updateScript,
    deleteScript,
    addScript
} = require("./script.schema")



const rootQuery = new GraphQLObjectType({
    name: "rootQuery",
    fields: {
        script: scriptRootQuery,
        kvm: kvmRootQuery
    }
})
const rootMutation = new GraphQLObjectType({
    name: 'rootMutation',
    fields: {
        addScript,
        deleteScript,
        updateScript,
        addKvm,
        deleteKvm,
        updateKvm
    }
})


module.exports = new GraphQLSchema({
    query: rootQuery,
    mutation: rootMutation
})