{
    //method to submit form data to create post using ajax
    let createPost = function(){
        let form = $("#todo-form");
        form.submit(function(e){
            e.preventDefault();
            $.ajax({
                type:"POST",
                url:"/create",//url sahi ?   han q ki db me add hora h okayy
                data:form.serialize(),
                success: function(data){
                    console.log(data.data.todo);
                    let newtodo = createtodoDOM(data.data.todo);
                    $("#item-con").prepend(newtodo);
                    

                     
                    

                },error: function(err){
                    console.log(err.responseText);
                }
            })
        });

    }

    //method to add form to dom
    let createtodoDOM = function(todo){

        return $(`<div class="row todo-${todo._id}" id="ro">
                  <div class="item-category">
                   <h2>${todo.category}</h2>
                  </div>



            
                  

                   
                    <a href="/select?id=${todo.id}" id="tick">  <i class="fa fa-check" aria-hidden="true"></i></a>
                    <p id="task"> ${todo.task}   </p>
                     
                  
                <i class="fa fa-calendar-check-o" aria-hidden="true" id="cal"></i>
                 <p id="dt"> 
                    ${todo.created_at}
                </p>
            

            </div>
            <br>
            <br>
            
           }
          }`)
    }

   
    

    let deletePost = function(deleteLink){
        console.log(deleteLink);
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'GET',
                url:$(deleteLink).prop('href'),
                success:function(data){
                    
                    console.log(data);
                    for(let i=0;i<data.data.length;i++)
                    {
                        console.log(data.data[i]);
                        let s = ".todo-"+data.data[i];
                        console.log(s);
                        $(".todo-"+ data.data[i]._id).remove();
                        

                    }
                    // $(`#todo-${data.}`)


                },
                error:function(err){
                    console.log(err.responseText);
                }


            });


        });
    }
    
    let dellink = $("#del-post");
    deletePost(dellink);
    createPost();
}