document.addEventListener('DOMContentLoaded',(e)=>{
  
    let notes = document.getElementById('notes');
    let noteDetail = document.getElementById('note-detail');
    let noteAdd = document.getElementById('note-add');
    let addPost = document.getElementById('addPost');
    let back = document.getElementById('back');
    let back1 = document.getElementById('back1');

    back.addEventListener('click',(bc)=>{
      notes.style.display='block';
      noteDetail.style.display='none';
      noteAdd.style.display='none';
    });
    back1.addEventListener('click',(bc1)=>{
      notes.style.display='block';
      noteDetail.style.display='none';
      noteAdd.style.display='none';
    });

    noteDetail.style.display='none';
    noteAdd.style.display='none';

    //عرض الملاحظات
    fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json()) 
  .then(data => {
    const titles = data.map(post => post.title);
    const body = data.map(post => post.body);
    const userId = data.map(post=>post.userId);
    const id = data.map(post=>post.id);
  
    const posts = data.map(post => {
        return {
          title: post.title, 
          body: post.body,
          userId:post.userId,
          id:post.id
        }
      });
      posts.forEach(post => {
        const elTitle =document.createElement('h3');
              elTitle.id='title';
              notes.appendChild(elTitle);
              elTitle.innerHTML = post.title;

            const elBody =document.createElement('p');
            elBody.id='body';
            notes.appendChild(elBody);
            elBody.innerHTML = post.body;

            // const elUserId =document.createElement('h2');
            // elUserId.id='userId';
            // notes.appendChild(elUserId);
            // elUserId.innerHTML = post.userId;

            const elId =document.createElement('a');
            elId.id='id';
            notes.appendChild(elId);
            elId.innerHTML = post.id + 'اقرأ التفاصيل';

            //عرض التفاصيل
            elId.addEventListener('click',(elDelail)=>{
              noteDetail.style.display='block';
              noteAdd.style.display='none';
              notes.style.display='none';
              
                  // back.addEventListener('click',(bc)=>{
                  //   notes.style.display='block';
                  //   noteDetail.style.display='none';
                  //   noteAdd.style.display='none';
                  // });
                  
                 const elTitle =document.createElement('h3');
                 elTitle.id='title';
                 noteDetail.appendChild(elTitle);
                 elTitle.innerHTML = post.title;
   
               const elBody =document.createElement('p');
               elBody.id='body';
               noteDetail.appendChild(elBody);
               elBody.innerHTML = post.body;

               const postId =post.id;
               fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
                  .then(res => res.json()) 
                  .then(data => {
                    console.log(data);
                    const name = data.map(comment =>comment.name);
                    const body = data.map(comment =>comment.body);
                    const email = data.map(comment=>comment.email);
                    console.log(name);

                    const comments = data.map(comment => {
                      return {
                        name: comment.name, 
                        body: comment.email,
                        email:comment.body
                      }
                    });

                    const elComment =document.createElement('h1');
                    elComment.id='Comment';
                    noteDetail.appendChild(elComment);
                    elComment.innerHTML = 'التعليقات';

                    comments.forEach(comment => {
                      const elName =document.createElement('h2');
                            elName.id='name';
                            noteDetail.appendChild(elName);
                            elName.innerHTML = comment.name+':';

                            const elBody =document.createElement('p');
                          elBody.id='body';
                          noteDetail.appendChild(elBody);
                          elBody.innerHTML ='from: '+ comment.body;

                      const elEmail =document.createElement('h3');
                            elEmail.id='email';
                            noteDetail.appendChild(elEmail);
                            elEmail.innerHTML = comment.email;
              
                    })
                  })
              
            })

      })
    
  });
  //اضافة ملاحظة
  fetch('https://jsonplaceholder.typicode.com/posts')
  .then(res1 => res1.json())
  .then(data1 => { 
  addPost.addEventListener('click',(addP)=>{
        
    noteDetail.style.display='none';
    noteAdd.style.display='block';
    notes.style.display='none';
    
    // Data is an array of objects
  const lastItem = data1[data1.length - 1];

  // Get id from last item
  const lastId = lastItem.id;



    let titl =document.getElementById('titl');
    let body1=document.getElementById('body1');
    let send=document.getElementById('send');
    send.addEventListener('click',(sen)=>{
      
      noteDetail.style.display='none';
      noteAdd.style.display='none';
      notes.style.display='block';


      const newPost = {
        userId: 1,
        id:lastId+1,
        title: titl.value, 
        body: body1.value
      };
      data1.push(newPost);

      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data1)
        }).then(res => {
                    res.json()
                    if (res.status>=200) {
                      alert('تم الاضافة بنجاح')
                    }else{
                      alert('فشلت عملية الاضافة')
                    }
                  })
        .then(newData => {
          console.log(newData);
              })
    })
   
  })
})


})

