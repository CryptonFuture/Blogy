

(function ($) {



	"use strict";

	var fullHeight = function () {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function () {
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	$('#sidebarCollapse').on('click', function () {
		$('#sidebar').toggleClass('active');
	});



	// const cardData = [
	// 	{ title: 'No. Of Post', count: 10, bgcolor: '#f75815', textColor: 'white', borderColor: 'black' },
	// 	{ title: 'No. Of Tag', count: 24, bgcolor: 'white', textColor: 'black', borderColor: '#f75815' },
	// 	{ title: 'No. Of Pages', count: 58, bgcolor: '#f75815', textColor: 'white', borderColor: 'black' },
	// 	{ title: 'No. Of User', count: 17, bgcolor: 'white', textColor: 'black', borderColor: '#f75815' },
	// ]

	// $(document).ready(function () {
	// 	cardData.forEach(function (item) {
	// 		const card = `
	// 		<div class="col-12 col-lg-3 mb-3">
	// 			<div class="border-0 shadow-sm card card-body-1" style="background-color: ${item.bgcolor}; border-bottom: 2px solid ${item.borderColor} !important">
	// 				<div class="card-body rounded">
	// 					<h5 class="card-title" style="color: ${item.textColor}">${item.title}</h5>
	// 					<h6 class="card-subtitle mb-2" style="color: ${item.textColor}">${item.count}</h6>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	`;
	// 		$('#cardRow').append(card)
	// 	})
	// })

	const accessToken = localStorage.getItem('token')

	if (!accessToken) {
		window.location.href = '/';
	}

}) (jQuery);


	document.addEventListener('DOMContentLoaded', function () {
		fetchUser()
		fetchPage()
		fetchTag()
		fetchPost()
		fetchDashboard()
		getSideBarRoutes()
	})

	const prefix = 'api/v1'
	const baseUrl = `http://localhost:8000/${prefix}`

	const tokenType = localStorage.getItem('tokenType')
	const access_Token = localStorage.getItem('token')

	async function fetchPost() {
		const res = await fetch(`${baseUrl}/getPost`, {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `${tokenType} ${access_Token}`
			}
		})

		const data = await res.json()

		const post = data.data

		const list = document.getElementById('postlist')

		list.innerHTML = '';

		post.forEach((item, index) => {

			list.innerHTML += `
		<tr>
			<th scope="row">${index + 1}</th>
			<td>${item.title}</td>
			<td>${item.description}</td>
			<td>${item.status ? 'Published' : 'unPublished'}</td>
			<td>${new Date(item.createdAt).toISOString().split('T')[0]}</td>
			<td>${new Date(item.updatedAt).toISOString().split('T')[0]}</td>
			<td><div class="dropdown">
		<button class="btn border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
			&#8942;
		</button>
		<ul class="dropdown-menu">
			<li><a class="dropdown-item" href="#"> <i class="fas fa-eye me-2 text-warning"></i> View</a></li>
			<a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#editPostModal">
		<i class="fas fa-edit me-2 text-info"></i> Edit
		</a>
			<li><a onclick="deletePost('${item._id}')" class="dropdown-item" href="#"><i class="fas fa-trash-alt me-2 text-danger"></i> Delete</a></li>
		</ul>
			</tr>
		`;
		})

	}



	async function fetchTag() {
		const res = await fetch(`${baseUrl}/getTag`, {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `${tokenType} ${access_Token}`
			}
		})

		const data = await res.json()

		const tag = data.data

		console.log('FETCH TAG',tag);
		

		const list = document.getElementById('taglist')

		list.innerHTML = '';

		tag.forEach((item, index) => {

			list.innerHTML += `
		<tr>
			<th scope="row">${index + 1}</th>
			<td>${item.tagName}</td>
			<td>${item.description}</td>
			<td>${item.status ? 'Active' : 'InActive'}</td>
			<td>${new Date(item.createdAt).toISOString().split('T')[0]}</td>
			<td>${new Date(item.updatedAt).toISOString().split('T')[0]}</td>
			<td><div class="dropdown">
		<button class="btn border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
			&#8942;
		</button>
		<ul class="dropdown-menu">
			<li><a class="dropdown-item" href="#"> <i class="fas fa-eye me-2 text-warning"></i> View</a></li>
			<a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edittagModal">
		<i class="fas fa-edit me-2 text-info"></i> Edit
		</a>
			<li><a class="dropdown-item" href="#" onclick="deleteTag('${item._id}')"><i class="fas fa-trash-alt me-2 text-danger"></i> Delete</a></li>
		</ul>
			</tr>
		`;
		})

	}


	async function fetchPage() {
		const res = await fetch(`${baseUrl}/getPages`, {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `${tokenType} ${access_Token}`
			}
		})

		const data = await res.json()

		const page = data.data

		console.log('FETCH PAGE',page);
		

		const list = document.getElementById('pagelist')

		list.innerHTML = '';

		page.forEach((item, index) => {

			list.innerHTML += `
		<tr>
			<th scope="row">${index + 1}</th>
			<td>${item.pageName}</td>
			<td>${item.description}</td>
			<td>${item.status ? 'Active' : 'InActive'}</td>
			<td>${new Date(item.createdAt).toISOString().split('T')[0]}</td>
			<td>${new Date(item.updatedAt).toISOString().split('T')[0]}</td>
			<td><div class="dropdown">
		<button class="btn border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
			&#8942;
		</button>
		<ul class="dropdown-menu">
			<li><a class="dropdown-item" href="#"> <i class="fas fa-eye me-2 text-warning"></i> View</a></li>
			<a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#editPageModal">
		<i class="fas fa-edit me-2 text-info"></i> Edit
		</a>
			<li><a class="dropdown-item" href="#" onclick="deletePage('${item._id}')"><i class="fas fa-trash-alt me-2 text-danger"></i> Delete</a></li>
		</ul>
			</tr>
		`;
		})

	}

	async function fetchUser() {
		const res = await fetch(`${baseUrl}/getUser`, {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `${tokenType} ${access_Token}`
			}
		})

		const data = await res.json()

		const user = data.data

		console.log('FETCH USER',user);
		

		const list = document.getElementById('userlist')

		list.innerHTML = '';

		user.forEach((item, index) => {

			list.innerHTML += `
		<tr>
			<th scope="row">${index + 1}</th>
			<td>${item.firstname} ${item.lastname}</td>
			<td>${item.email}</td>
			<td>${new Date(item.createdAt).toISOString().split('T')[0]}</td>
			<td>${new Date(item.updatedAt).toISOString().split('T')[0]}</td>
			<td><div class="dropdown">
		<button class="btn border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
			&#8942;
		</button>
		<ul class="dropdown-menu">
			<li><a class="dropdown-item" href="#"> <i class="fas fa-eye me-2 text-warning"></i> View</a></li>
			<a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#editUserModal">
		<i class="fas fa-edit me-2 text-info"></i> Edit
		</a>
			<li><a class="dropdown-item" href="#" onclick="deleteUser('${item._id}')"><i class="fas fa-trash-alt me-2 text-danger"></i> Delete</a></li>
		</ul>
			</tr>
		`;
		})

	}


	async function fetchDashboard() {
		const res = await fetch(`${baseUrl}/countAll`, {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `${tokenType} ${access_Token}`
			}
		})

		const data = await res.json()

		const counts = data.count

		Object.entries(counts).map(([key, item]) => {
			const card = `
			<div class="col-12 col-lg-3 mb-3">
				<div class="border-0 shadow-sm card card-body-1" style="background-color: ${item.bgcolor}; border-bottom: 2px solid ${item.borderColor} !important">
					<div class="card-body rounded">
						<h5 class="card-title" style="color: ${item.textColor}">${item.title}</h5>
						<h6 class="card-subtitle mb-2" style="color: ${item.textColor}">${item.total}</h6>
					</div>
				</div>
			</div>
		`;
			document.getElementById('cardRow').insertAdjacentHTML('beforeend', card)
		})
	}

	async function getSideBarRoutes() {
		const res = await fetch(`${baseUrl}/getSideBarRoutes`, {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `${tokenType} ${access_Token}`
			}
		})

		const data = await res.json()

		const sideBarRoutes = data.data

		const sideBarRouteslist = document.getElementById('sideBarRoutes')

		sideBarRouteslist.innerHTML = '';

		sideBarRoutes.forEach((item, index) => {
			sideBarRouteslist.innerHTML += `
			 <li class="active">
          	  <a onclick="showPage('${item.paramName}')" href="#" class="menu-link" data-content="dashboard"><span
              class="fa ${item.iconName}"></span>${item.routeName}</a>
        	</li>
			`
		})


	}

	function checkTokenExpiry() {
	const tokenExpiry = localStorage.getItem('tokenExpiry');
	if (!tokenExpiry) return;

	const now = new Date();
	const expiryDate = new Date(tokenExpiry);

	if (now >= expiryDate) {
		logout();
	}
}


	async function logout() {
		
		const userId = localStorage.getItem('user')

		const res = await fetch(`${baseUrl}/logout?id=${userId}`, {
			method: 'POST'
		})

		const data = await res.json()

		if (res.ok) {
			localStorage.removeItem('token');
			localStorage.removeItem('user');
			localStorage.removeItem('email');
			localStorage.removeItem('tokenType');
			localStorage.removeItem('rememberMe')
			localStorage.removeItem('rememberedEmail');
      		localStorage.removeItem('rememberedPassword');
			localStorage.removeItem('tokenExpiry');

			Swal.fire({
				icon: 'success',
				title: 'Logout Successful',
				text: data.message,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			}).then(() => {
				window.addEventListener('load', checkTokenExpiry);
				setInterval(checkTokenExpiry, 60 * 1000);
				window.location.href = '/';

			});

		} else {
			Swal.fire({
				icon: 'error',
				title: 'Logout Failed',
				text: data.error
			});
		}
	}

	async function deletePost(id) {
		const result = await Swal.fire({
			title: 'Are you sure you want to delete this post?',
			text: 'You won\'t be able to revert this!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: 'Yes, delete it!',
			cancelButtonText: 'Cancel'
		})

		if(result.isConfirmed) {
			const res = await fetch(`${baseUrl}/deletePost/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `${tokenType} ${access_Token}`
				}
			})

			const data = await res.json()

			if (res.ok) {
				Swal.fire({
				icon: 'success',
				title: 'Delete Successfully',
				text: data.message,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
				}).then(() => {
					fetchPost(); 
				});
				
			} else {
				const err = await res.json();
				Swal.fire({
				icon: 'error',
				title: `Failed to delete post: ${err.error || res.statusText}`,
				text: data.error,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
				})
			}
		}
	}

	async function deleteTag(id) {
		const result = await Swal.fire({
			title: 'Are you sure you want to delete this tag?',
			text: 'You won\'t be able to revert this!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: 'Yes, delete it!',
			cancelButtonText: 'Cancel'
		})

		if(result.isConfirmed) {
			const res = await fetch(`${baseUrl}/deleteTag/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `${tokenType} ${access_Token}`
				}
			})

			const data = await res.json()

			if (res.ok) {
				Swal.fire({
				icon: 'success',
				title: 'Delete Successfully',
				text: data.message,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
				}).then(() => {
					fetchTag(); 
				});
				
			} else {
				const err = await res.json();
				Swal.fire({
				icon: 'error',
				title: `Failed to delete post: ${err.error || res.statusText}`,
				text: data.error,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
				})
			}
		}
	}

	async function deletePage(id) {
		const result = await Swal.fire({
			title: 'Are you sure you want to delete this page?',
			text: 'You won\'t be able to revert this!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: 'Yes, delete it!',
			cancelButtonText: 'Cancel'
		})

		if(result.isConfirmed) {
			const res = await fetch(`${baseUrl}/deletePage/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `${tokenType} ${access_Token}`
				}
			})

			const data = await res.json()

			if (res.ok) {
				Swal.fire({
				icon: 'success',
				title: 'Delete Successfully',
				text: data.message,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
				}).then(() => {
					fetchPage(); 
				});
				
			} else {
				const err = await res.json();
				Swal.fire({
				icon: 'error',
				title: `Failed to delete post: ${err.error || res.statusText}`,
				text: data.error,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
				})
			}
		}
	}

	async function deleteUser(id) {
		const result = await Swal.fire({
			title: 'Are you sure you want to delete this user?',
			text: 'You won\'t be able to revert this!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: 'Yes, delete it!',
			cancelButtonText: 'Cancel'
		})

		if(result.isConfirmed) {
			const res = await fetch(`${baseUrl}/deleteUser/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `${tokenType} ${access_Token}`
				}
			})

			const data = await res.json()

			if (res.ok) {
				Swal.fire({
				icon: 'success',
				title: 'Delete Successfully',
				text: data.message,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
				}).then(() => {
					fetchUser(); 
				});
				
			} else {
				const err = await res.json();
				Swal.fire({
				icon: 'error',
				title: `Failed to delete post: ${err.error || res.statusText}`,
				text: data.error,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
				})
			}
		}
	}