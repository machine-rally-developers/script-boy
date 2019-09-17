import { gql } from 'apollo-boost'

const getScript = gql`
query($id:ID!){
    script(id:$id)
    {   _id   
        name
        type
        data
    }
}`;

const deleteScript = gql`
    mutation($id:ID!){
        deleteScript(id:$id){
            _id   
           name
           type
           data
        }
    }
    `

const addScript = gql`
    mutation($name:String!, $type:String!, $data:String!){
        addScript(name: $name, type:$type , data:$data){
            key
        }
    }`

export { getScript, addScript, deleteScript }