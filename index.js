
// const fetchData = () => {
//   return new Promise( (res, rej) => {
    
//     setTimeout(() => {
//       const data = [{ name: "sobith", age: 22 },{name: "ajil", age: 23}];
//       res(data)
//     }, 2000);
//   });
// };

// fetchData()
//   .then((data) => {
//     console.log("Data:", data);
//      return data;
//   }).catch((error) => {
//     console.error(error);
//   })
//   .then((data) => {
//     console.log("Age:", data[0].age);
//   })
 

// const promise1 = new Promise(resolve => setTimeout(resolve, 1000, 'foo'));
// const promise2 = new Promise(resolve => setTimeout(resolve, 2000, 'bar'));
// const promise3 = new Promise(resolve => setTimeout(resolve, 1500, 'baz'));

// Promise.all([promise1, promise2, promise3])
//   .then((results)=> {
//     console.log('All promises resolved:', results);
//   })
//   .catch((error)=> {
//     console.error('Error:', error.message);
//   });


  // const promise1 = new Promise( resolve => setTimeout(resolve, 10000, 'foo'));
  // const promise2 = new Promise( resolve => setTimeout(resolve, 1999, 'bar'));
  // const promise3 = new Promise( resolve => setTimeout(resolve, 15000, 'baz'));
  
  
  // Promise.race([ promise1, promise2, promise3])
  //   .then((results)=> {
  //     console.log('All promises resolved:', results);
  //   })
  //   .catch((error)=> {
  //     console.error('Error:', error.message);
  //   });  


    // function fetchData() {
    //   return new Promise(async (resolve, reject) => {
    //     try {
    //       const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    //       if (!response.ok) {
    //         throw new Error('Failed to fetch data');
    //       }
    //       const data =  response.json();
    //       resolve(data);
    //     } catch (error) {
    //       reject(error);
    //     }
    //   });
    // }
    
    // fetchData()
    //   .then(data => {
    //     console.log('Data:', data);
    //   })
    //   .catch(error => {
    //     console.error('Error:', error);
    //   });
    


    async function fetchData(){
      try{
        const data = await fetch('https://mocki.io/v1/ec62bc7c-ec4b-4462-b146-c1423c778150')
        // console.log(data)
        const res=data.json()
        // console.log(res)
        
        if(!data.ok){
          throw Error
        }
        return res
        // console.log("data",data)
      }
      catch{
        console.log("Network error")
      }
    }
    fetchData()
     .then(s=>{
      console.log('datas',s)
     })