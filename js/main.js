let postsdiv=document.getElementById("posts")
let d=document.getElementById("d")
let token=localStorage.getItem("token");
let show_loader=document.getElementById("show-loader")

if(postsdiv !=null){
function getPosts(){
    
        postsdiv.innerHTML=""

    
        axios.get('https://tarmeezacademy.com/api/v1/posts')
        .then((res)=>{
            let posts=res.data.data
            posts.map((post)=>{
                // show or hide edit btn
                let user=getCurentUser()
                let isMyPost=user != null && post.author.id ==user.id
                let editBtn=``
                if(isMyPost){
                    editBtn=`<button type="button" class="btn btn-secondary" style="float:right" onclick="editPost('${encodeURIComponent(JSON.stringify(post))}')">edit</button>`
                    deleteBtn=`<button type="button" class="btn btn-danger" style="float:right;margin-left:5px" onclick="deletePost('${post.id}')">delete</button>`
                    
                }else{
                    editBtn=""
                    deleteBtn=""
                }
                postsdiv.innerHTML+=`
          
            <div class="card shadow" >
                  <div class="card-header d-flex justify-content-between align-items-center">
                  <div onclick="userClicked(${post.author.id})" style="cursor: pointer">
                  
                  <img src="${post.author.profile_image}" alt="" style="width: 50px;height: 50px;border-radius: 50%; " class="border border-2">
                  <b >@${post.author.name}</b>
                  </div>
                  <div">
                    
                        
                  ${deleteBtn}
                  ${editBtn}
                   
                    </div>
                    </div>
                  <div class="card-body" onclick="postClicked(${post.id})" style="cursor: pointer">
                    <img src="${post.image}" id="post-img" alt="img" style="width: 100%;max-width: 100%">
                    <h6 style="color: rgb(167, 165, 165);">${post.created_at}</h6>
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">
                      ${post.body}
                    </p>
                    <hr>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                        </svg>
                        <span>(${post.comments_count}) comment</span>
                      </div>
                  </div>
                </div>
            `
            show_loader.style.display="none"
        }
            )
        })
    }
    getPosts()
}
let post=document.getElementById("post")
function postClicked(postId){
console.log(postId);
window.location=`postDetails.html?postId=${postId}`
    
}

//----------------- loginBtnClicked----------------
let user_name = document.getElementById("user-name");

function loginBtnClicked() {
    // الحصول على قيم المدخلات
    let username = document.getElementById("username-input").value;
    let password = document.getElementById("password-input").value;
    let btns = document.getElementById("btns");

    // التحقق من أن الحقول غير فارغة
    if (!username || !password) {
        alert("الرجاء إدخال اسم المستخدم وكلمة المرور");
        return;
    }

    // إرسال طلب POST لتسجيل الدخول
    axios.post("https://tarmeezacademy.com/api/v1/login", {
        "username": username,
        "password": password
    })
    .then((response) => {
        // في حالة النجاح
        console.log("تم تسجيل الدخول بنجاح:", response.data);

        // حفظ بيانات المستخدم في localStorage (اختياري)
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        const modal=document.getElementById("login-Modal")
        const modalinstance=bootstrap.Modal.getInstance(modal)
        modalinstance.hide()
        setUpUi()
        showSuccessAlert('nice,you loged in successfully !',"success")
        d.style.setProperty("display", "flex","important")

        
        // إعادة توجيه المستخدم إلى الصفحة الرئيسية (اختياري)
        // window.location.href = "/home.html";
    })
    
    .catch((error) => {
        // في حالة الفشل
        console.error("فشل تسجيل الدخول:", error.response.data);

        // عرض رسالة خطأ للمستخدم
        showSuccessAlert(error.response.data.message,"danger")
    });
}
// -----------------regesterBtnClicked---------------------
function regesterBtnClicked() {
    // الحصول على قيم المدخلات
    let name = document.getElementById("register-name-input").value;
    let username = document.getElementById("register-username-input").value;
    let email = document.getElementById("register-email-input").value;
    let password = document.getElementById("register-password-input").value;
    let image = document.getElementById("register-image-input").files[0];
    let btns = document.getElementById("btns")

    // إرسال طلب POST لتسجيل الدخول
    let formData=new FormData()
    formData.append("name", name)
    formData.append("username", username)
    formData.append("email", email)
    formData.append("password", password)
    formData.append("image", image)
    axios.post("https://tarmeezacademy.com/api/v1/register",formData)
    .then((response) => {
        // في حالة النجاح
        console.log("تم تسجيل الدخول بنجاح:", response.data);
// const profileImage = response.data.user.profile_image;

        // حفظ بيانات المستخدم في localStorage (اختياري)
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        const modal=document.getElementById("register-Modal")
        const modalinstance=bootstrap.Modal.getInstance(modal)
        modalinstance.hide()
        
        setUpUi()
        
        showSuccessAlert('nice,your registeretion has been successfully !',"success")
        
        // إعادة توجيه المستخدم إلى الصفحة الرئيسية (اختياري)
        // window.location.href = "/home.html";
    })
    
    .catch((error) => {
        // في حالة الفشل
        console.error("فشل تسجيل الدخول:", error.response.data);

        // عرض رسالة خطأ للمستخدم
        showSuccessAlert(error.response.data.message ,"danger")
    });
}
// ===================creat new post==================
function creatPost() {
    let postId=document.getElementById('post-id-input').value
    let isCreate= postId== null || postId==""
    // الحصول على قيم المدخلات
    let title = document.getElementById("post-title-input").value;
    let body = document.getElementById("post-body-input").value;
    let img = document.getElementById("post-img-input").files[0];
    const token =localStorage.getItem("token")
    // let password = document.getElementById("register-password-input").value;
    // let password = document.getElementById("password-input").value;
    let btns = document.getElementById("btns")

    // إرسال طلب POST لاضافه جديد
    let formData=new FormData()
    formData.append("title", title)
    formData.append("body", body)
    formData.append("image", img)
    if(isCreate){
        title=""
        axios.post("https://tarmeezacademy.com/api/v1/posts", formData
            ,{
            headers:{
                "authorization": `Bearer ${token}`
            }
        })
        .then((response) => {
            // في حالة النجاح       
            const modal=document.getElementById("addPost-Modal")
            const modalinstance=bootstrap.Modal.getInstance(modal)
            modalinstance.hide();
            getPosts()
            setUpUi()
            showSuccessAlert('nice,your post has been added successfully !',"success")
        })
        
        .catch((error) => {
            // في حالة الفشل
            console.log("فشل تسجيل الدخول:", error);
    
            // عرض رسالة خطأ للمستخدم
            showSuccessAlert(error.response.data.message ,"danger")
        });
    }
else{
    formData.append("_method","put")
        axios.post(`https://tarmeezacademy.com/api/v1/posts/${postId}`, formData
            ,{
            headers:{
                "authorization": `Bearer ${token}`
            }
        })
        .then((response) => {
            // في حالة النجاح
    
           
            const modal=document.getElementById("addPost-Modal")
            const modalinstance=bootstrap.Modal.getInstance(modal)
            modalinstance.hide();
            getPosts()
            setUpUi()
            showSuccessAlert('nice,your post has been edited successfully !',"success")
    
            
            // إعادة توجيه المستخدم إلى الصفحة الرئيسية (اختياري)
            // window.location.href = "/home.html";
        })
        
        .catch((error) => {
            // في حالة الفشل
            console.log("فشل تسجيل الدخول:", error);
    
            // عرض رسالة خطأ للمستخدم
            showSuccessAlert(error.response.data.message ,"danger")
        })
    }
}
   
function logout(){
    localStorage.clear()
    user_name.innerHTML=``
    
    
    setUpUi()
    showSuccessAlert("nice,you loged out successfully !","success")
    d.style.setProperty("display", "none","important")
   

}

// =====refresh the ui===========
function setUpUi(){
    const token=localStorage.getItem("token")
    const btns_logedin=document.getElementById("btns_logedin")
    const logoutDiv=document.getElementById("logout-div")
    const user=JSON.parse(localStorage.getItem("user"))
    const prof_img=document.getElementById("prof-img")

let addbtn=document.getElementById("addbtn")

    if(token ==null){
        if(addbtn != null){
            addbtn.style.display="none"

        }
        btns_logedin.style.setProperty("display", "flex","important")
        logoutDiv.style.setProperty("display", "none","important")

    }else{
        btns_logedin.style.setProperty("display", "none","important")
        logoutDiv.style.setProperty("display", "flex","important")
        prof_img.src=`${user.profile_image}`

        user_name.innerHTML=user.name
    if(addbtn != null){
        addbtn.style.display="block"

    }
prof_img.style.display="block"


    }
}
setUpUi()
function showSuccessAlert(messagetext, color) {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    const appendAlert = (message, type) => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('');

        alertPlaceholder.append(wrapper);

        // إغلاق التنبيه بعد 3 ثواني
        setTimeout(() => {
            wrapper.remove();
        }, 3000);
    };

    appendAlert(messagetext, color);
}

// //=====setui==============//
// ===========addpost==============
function editPost(postObject){
    let post=JSON.parse(decodeURIComponent(postObject))
    document.getElementById('post-submit-btn').innerHTML="update"
    document.getElementById('post-id-input').value=post.id
    document.getElementById('post-modal-title').innerHTML="edit post"
    document.getElementById('post-title-input').value=post.title
    document.getElementById('post-body-input').value=post.body
    document.getElementById('post-img').src=post.image
    
    var myModal = new bootstrap.Modal(document.getElementById('addPost-Modal'), {})
    myModal.toggle()
   
    
    
    
}
function getCurentUser(){
    let user =null
    const storageUser=localStorage.getItem("user")
    if(storageUser != null){
        user=JSON.parse(storageUser)
        return user
    }
}

// ============addPost============
function addPost(){
    document.getElementById('post-submit-btn').innerHTML="create"
    document.getElementById('post-id-input').value=""
    document.getElementById('post-modal-title').innerHTML="create a new post"
    document.getElementById('post-title-input').value=""
    document.getElementById('post-body-input').value=""
    // document.getElementById('post-img').src=post.image
    
    var myModal = new bootstrap.Modal(document.getElementById('addPost-Modal'), {})
    myModal.toggle()
   
}

function deletePost(postId){
    
    axios.delete(`https://tarmeezacademy.com/api/v1/posts/${postId}`
        ,{
        headers:{
            "authorization": `Bearer ${token}`
        }
    })
    .then((response) => {
        // في حالة النجاح
        getPosts()
        setUpUi()
        getUserDetails()
        showSuccessAlert('nice,your post has been deleted successfully !',"success")
    })
    
    .catch((error) => {
        // في حالة الفشل
        console.log("فشل تسجيل الدخول:", error);

        // عرض رسالة خطأ للمستخدم
        showSuccessAlert(error.response.data.message ,"danger")
    })
}

// ---------------------------
function userClicked(postId){
    window.location=`profile.html?postId=${postId}`
}
function profileClicked(){
    let user=getCurentUser()
    window.location=`profile.html?postId=${user.id}`
}
