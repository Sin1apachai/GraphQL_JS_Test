const {
    GraphQLList,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} = require('graphql');

const fetch = require('node-fetch')

getUser = () => ({
    email: 'john@abc.com',
    name: 'john',
    nickname: 'jj'
})

const BASE_URL = 'https://jsonplaceholder.typicode.com/'
function fetchResponseByURL(relativeURL) {
    return fetch(`${BASE_URL}${relativeURL}`).then(res => res.json())
}

function fetchUser() {
    return fetchResponseByURL('users')
}

function fetchAlbum(parent, { userId }) {
    return fetchResponseByURL('albums?userId=' + userId)
}

function fetchPhoto(parent, { albumId }) {
    return fetchResponseByURL('photos?albumId=' + albumId)
}

const AlbumType = new GraphQLObjectType({
    name: 'Album',
    fields: () => ({
        userId: { type: GraphQLInt },
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
    })
})

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
    })
})

const PhotoType = new GraphQLObjectType({
    name: 'Photo',
    fields: () => ({
        albumId: { type: GraphQLInt },
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        thumbnailUrl: { type: GraphQLString }
    })
})

const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        allUser: {
            type: new GraphQLList(UserType),
            resolve: fetchUser
        },
        albumsByUser: {
            type: new GraphQLList(AlbumType),
            args: {
                userId: { type: GraphQLInt }
            },
            resolve: fetchAlbum
        },
        photosByAlbum: {
            type: new GraphQLList(PhotoType),
            args: {
                albumId: { type: GraphQLInt }
            },
            resolve: fetchPhoto
        }
    })
})

// const User = new GraphQLObjectType({
//     name: 'User',
//     fields: () => ({
//         email: { type: GraphQLString },
//         name: { type: GraphQLString },
//         nickname: { type: GraphQLString }
//     })
// })

// const QueryType = new GraphQLObjectType({
//     name: 'Query',
//     fields: () => ({
//         user: {
//             type: User,
//             resolve: () => {
//                 return getUser()
//             }
//         }
//     })
// })
const schema = new GraphQLSchema({
    query: QueryType,
})

module.exports = schema