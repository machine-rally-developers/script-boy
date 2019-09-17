import { gql } from 'apollo-boost'

const getKvm = gql`
{
    kvm(id:"")
    {     _id   
        key
        value
        encrypted 
    }
}`;
const deleteKvm = gql`
    mutation($id:ID!){
        deleteKvm(id:$id){
            _id   
            key
            value
            encrypted 
        }
    }
    `

const addKvm = gql`
    mutation($key:String!, $value:String!, $encrypted:Boolean!){
        addKvm(key: $key, value:$value , encrypted:$encrypted){
            key
        }
    }`

export { getKvm, addKvm, deleteKvm }