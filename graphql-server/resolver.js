const  coursesData  = require('./data');
const getCourse = (args) => {
    const id= args.id;
    return coursesData.filter(course => course.id===id)[0];
} 

const getCourses = (args) => {
    if(args.topic){
        return coursesData.filter(course => course.topic === args.topic);
    }
    return coursesData;
}
// Root resolver
const resolver = {
    message: () => 'Hello World!',
    course: getCourse,
    courses: getCourses
};

module.exports = resolver;
