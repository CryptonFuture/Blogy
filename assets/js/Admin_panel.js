

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

	

})(jQuery);

const accessToken = localStorage.getItem('token')

	if (!accessToken) {
		window.location.href = '/';
	}


document.addEventListener('DOMContentLoaded', function () {
	fetchUser()
	fetchPage()
	fetchTag()
	fetchPost()
	fetchDashboard()
	getSideBarRoutes()
	postCount() 
})

const prefix = 'api/v1'
const baseUrl = `http://localhost:8000/${prefix}`

const tokenType = localStorage.getItem('tokenType')
const access_Token = localStorage.getItem('token')

let currentPage = 1;
const limit = 5;
let totalPages = 1;

let filters = {
  status: "",
  date: "",
};

async function fetchPost(page = 1) {
currentPage = page;

const sortValue = document.getElementById('sortSelect')?.value || "";
const searchInput = document.getElementById('searchInput')?.value || "";

 const queryParams = new URLSearchParams({
    search: searchInput,
    sort: sortValue,
    page: currentPage,
    limit,
    status: filters.status,
    date: filters.date 
  });

	const res = await fetch(`${baseUrl}/getPost?${queryParams.toString()}`, {
		method: "GET",
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	const post = data.data

	const list = document.getElementById('postlist')

	list.innerHTML = '';

	if (!data.success || post.length === 0) {
			list.innerHTML = '<tr><td colspan="7" class="text-center">No record found</td></tr>';
			document.getElementById('pagination').innerHTML = '';
		return;
	}

	post.forEach((item, index) => {

		list.innerHTML += `
		<tr>
			<th scope="row">${(currentPage - 1) * limit + index + 1}</th>
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
		<a onclick="viewPost('${item._id}')" class="dropdown-item view-btn" href="#" data-bs-toggle="modal" data-bs-target="#viewPostModal">
			<i class="fas fa-eye me-2 text-warning"></i> View
		</a>
			<a onclick="editPost('${item._id}')" class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#editPostModal">
		<i class="fas fa-edit me-2 text-info"></i> Edit
		</a>
			<li><a onclick="deletePost('${item._id}')" class="dropdown-item" href="#"><i class="fas fa-trash-alt me-2 text-danger"></i> Delete</a></li>
		</ul>
			</tr>
		`;
	})

	totalPages = data.pagination.totalPages;
	renderPaginationButtons(totalPages);

}

function applyFilters() {
  filters.status = document.getElementById('statusFilter').value;
  filters.date = document.getElementById('date').value;

  currentPage = 1;
  fetchPost();
}

function clearFilters() {
  document.getElementById('statusFilter').value = "";
  document.getElementById('date').value = "";

  filters.status = "";
  filters.date = "";

  currentPage = 1;

}

function resetFilters() {
  document.getElementById('statusFilter').value = "";
  document.getElementById('date').value = "";

  filters.status = "";
  filters.date = "";

  currentPage = 1;
  fetchPost();

  	const modal = bootstrap.Modal.getInstance(document.getElementById('filterModal'));
	modal.hide();
}

function renderPaginationButtons(total) {
	const pagination = document.getElementById('pagination');
	pagination.innerHTML = '';

	const prev = document.createElement('li');
	prev.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
	prev.innerHTML = `<a class="page-link" href="#">Previous</a>`;
	prev.onclick = (e) => {
		e.preventDefault();
		if (currentPage > 1) fetchPost(currentPage - 1);
	};
	pagination.appendChild(prev);

	for (let i = 1; i <= total; i++) {
		const pageBtn = document.createElement('li');
		pageBtn.className = `page-item ${i === currentPage ? 'active' : ''}`;
		pageBtn.innerHTML = `<a class="page-link" href="#">${i}</a>`;
		pageBtn.onclick = (e) => {
			e.preventDefault();
			fetchPost(i);
		};
		pagination.appendChild(pageBtn);
	}

	const next = document.createElement('li');
	next.className = `page-item ${currentPage === total ? 'disabled' : ''}`;
	next.innerHTML = `<a class="page-link" href="#">Next</a>`;
	next.onclick = (e) => {
		e.preventDefault();
		if (currentPage < total) fetchPost(currentPage + 1);
	};
	pagination.appendChild(next);
}

document.getElementById('searchInput')?.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		currentPage = 1;
		fetchPost();
	}
});

document.getElementById('sortSelect')?.addEventListener('change', () => {
	currentPage = 1;
	fetchPost();
});



async function fetchTag() {
	const res = await fetch(`${baseUrl}/getTag`, {
		method: "GET",
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	const tag = data.data

	console.log('FETCH TAG', tag);


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
			<a onclick="editTag('${item._id}')" class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edittagModal">
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
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	const page = data.data

	console.log('FETCH PAGE', page);


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
			<a onclick="editPage('${item._id}')" class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#editPageModal">
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
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	const user = data.data

	console.log('FETCH USER', user);


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
			<a onclick="editUser('${item._id}')" class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#editUserModal">
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

function setupAutoLogout() {
	const expiryTime = localStorage.getItem('tokenExpiry');
	
	if (!expiryTime) return;

	const timeLeft = expiryTime - Date.now();

	if (timeLeft <= 0) {
		logout();
	} else {
		setTimeout(() => {
			logout();
		}, timeLeft);
	}
}

window.addEventListener('load', () => {
	setupAutoLogout();
});



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

	if (result.isConfirmed) {
		const res = await fetch(`${baseUrl}/deletePost/${id}`, {
			method: 'DELETE',
			headers: {
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
		title: 'Are you sure you want to delete this post?',
		text: 'You won\'t be able to revert this!',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#d33',
		cancelButtonColor: '#3085d6',
		confirmButtonText: 'Yes, delete it!',
		cancelButtonText: 'Cancel'
	})

	if (result.isConfirmed) {
		const res = await fetch(`${baseUrl}/deleteTag/${id}`, {
			method: 'DELETE',
			headers: {
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

	if (result.isConfirmed) {
		const res = await fetch(`${baseUrl}/deletePage/${id}`, {
			method: 'DELETE',
			headers: {
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

	if (result.isConfirmed) {
		const res = await fetch(`${baseUrl}/deleteUser/${id}`, {
			method: 'DELETE',
			headers: {
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

async function addPost() {
	const title = document.getElementById('title').value
	const description = document.getElementById('description').value

	const res = await fetch(`${baseUrl}/addPost`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `${tokenType} ${access_Token}`
		},
		body: JSON.stringify({ title, description })
	})

	const data = await res.json()

	if (res.ok) {
		Swal.fire({
			icon: 'success',
			title: 'Create Post Successfully',
			text: data.message,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		}).then(() => {
			fetchPost();
			$('#exampleModal').modal('hide');
			document.getElementById('title').value = ""
			document.getElementById('description').value = ""
		});
	} else {
		Swal.fire({
			icon: 'error',
			title: `Failed to delete post: ${data.error}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}
}

async function addTag() {
	const tagName = document.getElementById('tag-Name').value
	const description = document.getElementById('tag-description').value

	const res = await fetch(`${baseUrl}/addTag`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `${tokenType} ${access_Token}`
		},
		body: JSON.stringify({ tagName, description })
	})

	const data = await res.json()

	if (res.ok) {
		Swal.fire({
			icon: 'success',
			title: 'Create Tag Successfully',
			text: data.message,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		}).then(() => {
			fetchTag();
			$('#tagModal').modal('hide');
			document.getElementById('tag-Name').value = ""
			document.getElementById('tag-description').value = ""
		});
	} else {
		Swal.fire({
			icon: 'error',
			title: `Failed to delete tag: ${data.error}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}
}

async function addPage() {
	const pageName = document.getElementById('pageName').value
	const description = document.getElementById('pagedescription').value

	const res = await fetch(`${baseUrl}/addPages`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `${tokenType} ${access_Token}`
		},
		body: JSON.stringify({ pageName, description })
	})

	const data = await res.json()

	if (res.ok) {
		Swal.fire({
			icon: 'success',
			title: 'Create Page Successfully',
			text: data.message,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		}).then(() => {
			fetchPage();
			$('#pagesModal').modal('hide');
			document.getElementById('pageName').value = ""
			document.getElementById('pagedescription').value = ""
		});
	} else {
		Swal.fire({
			icon: 'error',
			title: `Failed to delete page: ${data.error}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}
}

async function addUser() {
	const firstname = document.getElementById('firstName').value
	const lastname = document.getElementById('lastName').value
	const email = document.getElementById('email').value
	const password = document.getElementById('password').value
	const confirmPass = document.getElementById('confirmpassword').value

	const res = await fetch(`${baseUrl}/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `${tokenType} ${access_Token}`
		},
		body: JSON.stringify({ firstname, lastname, email, password, confirmPass})
	})

	const data = await res.json()
	

	if (res.ok) {
		Swal.fire({
			icon: 'success',
			title: 'Create User Successfully',
			text: data.message,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		}).then(() => {
			fetchUser();
			$('#userModal').modal('hide');
	document.getElementById('firstName').value = " "
	document.getElementById('lastName').value = " "
	document.getElementById('email').value = " "
	document.getElementById('password').value = " "
	document.getElementById('confirmpassword').value = " "
		});
	} else {
		
		Swal.fire({
			icon: 'error',
			title: `Failed to delete user: ${data.error}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}
}	

document.getElementById('editPostForm').addEventListener('submit', function(e) {
	e.preventDefault()
	const id = document.getElementById('edit-post-id').value
	updatePost(id)
})

async function editPost(id) {
	const res = await fetch(`${baseUrl}/editPostById/${id}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	if(res.ok && data.success && data.data.length > 0) {
		const post = data.data[0]
		document.getElementById('edit-post-id').value = post._id
		document.getElementById('edit-post-title').value = post.title
		document.getElementById('edit-post-description').value = post.description
		document.getElementById('edit-post-status').checked = post.status

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

document.getElementById('editTagForm').addEventListener('submit', function(e) {
	e.preventDefault()
	const id = document.getElementById('edit-tag-id').value
	updateTag(id)
})

document.getElementById('editPageForm').addEventListener('submit', function(e) {
	e.preventDefault()
	const id = document.getElementById('edit-page-id').value
	updatePage(id)
})

document.getElementById('editUserForm').addEventListener('submit', function(e) {
	e.preventDefault()
	const id = document.getElementById('edit-user-id').value
	updateUser(id)
})

async function editTag(id) {
	const res = await fetch(`${baseUrl}/editTagById/${id}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	console.log(data)

	if(res.ok && data.success && data.data.length > 0) {
		const tag = data.data[0]
		document.getElementById('edit-tag-id').value = tag._id
		document.getElementById('edit-tag-tagName').value = tag.tagName
		document.getElementById('edit-tag-description').value = tag.description
		document.getElementById('edit-tag-status').checked = tag.status

	} else {
		const err = await res.json();
		Swal.fire({
			icon: 'error',
			title: `Failed to delete tag: ${err.error || res.statusText}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}
}

async function editPage(id) {
	const res = await fetch(`${baseUrl}/editPagesById/${id}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	console.log(data)

	if(res.ok && data.success && data.data.length > 0) {
		const page = data.data[0]
		document.getElementById('edit-page-id').value = page._id
		document.getElementById('edit-page-pageName').value = page.pageName
		document.getElementById('edit-page-description').value = page.description
		document.getElementById('edit-page-status').checked = page.status

	} else {
		const err = await res.json();
		Swal.fire({
			icon: 'error',
			title: `Failed to delete page: ${err.error || res.statusText}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}
}

async function editUser(id) {
	const res = await fetch(`${baseUrl}/editUserById/${id}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	console.log(data)

	if(res.ok && data.success && data.data.length > 0) {
		const user = data.data[0]
		document.getElementById('edit-user-id').value = user._id
		document.getElementById('edit-user-firstname').value = user.firstname
		document.getElementById('edit-user-lastname').value = user.lastname
		document.getElementById('edit-user-email').value = user.email
		document.getElementById('edit-user-status').checked = user.status
		document.getElementById('edit-user-admin').checked = user.admin

	} else {
		const err = await res.json();
		Swal.fire({
			icon: 'error',
			title: `Failed to delete user: ${err.error || res.statusText}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}
}

async function viewPost(id) {
	
	const res = await fetch(`${baseUrl}/viewPostById/${id}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	if(res.ok && data.success && data.data.length > 0) {
		const view = data.data[0]

		document.getElementById('view-post-id').innerHTML = `<strong>ID: </strong> <span> ${view._id} </span>`
		document.getElementById('view-post-title').innerHTML =  `<strong>Title: </strong> <span> ${view.title} </span>`
		document.getElementById('view-post-description').innerHTML =  `<strong>Description: </strong> <span> ${view.description} </span>`
		document.getElementById('view-post-status').innerHTML = `<strong>Status: </strong> <span> ${view.status ? 'Published' : 'unPublished'} </span>`
		document.getElementById('view-post-createdAt').innerHTML = `<strong>CreatedAt: </strong> <span> ${new Date(view.createdAt).toISOString().split('T')[0]} </span>`
		document.getElementById('view-post-updatedAt').innerHTML = `<strong>UpdatedAt: </strong> <span> ${new Date(view.updatedAt).toISOString().split('T')[0]} </span>`
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


async function updatePost(id) {
	const title = document.getElementById('edit-post-title').value
	const description = document.getElementById('edit-post-description').value
	const status = document.getElementById('edit-post-status').checked

	const res = await fetch(`${baseUrl}/updatePost/${id}`, {
		method: 'PUT',
		headers: { 
			'Content-Type': 'application/json',
			'Authorization': `${tokenType} ${access_Token}` 
		},
		body: JSON.stringify({title, description, status})
	})

	const data = await res.json()

	if (res.ok) {
		Swal.fire({
			icon: 'success',
			title: 'Update Post Successfully',
			text: data.message,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		}).then(() => {
			fetchPost();
			$('#editPostModal').modal('hide');
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

<<<<<<< Updated upstream
async function postCount() {
	const res = await fetch(`${baseUrl}/countPost`, {
		method: 'GET'
=======
async function updateTag(id) {
	const tagName = document.getElementById('edit-tag-tagName').value
	const description = document.getElementById('edit-tag-description').value
	const status = document.getElementById('edit-tag-status').checked

	const res = await fetch(`${baseUrl}/updateTag/${id}`, {
		method: 'PUT',
		headers: { 
			'Content-Type': 'application/json',
			'Authorization': `${tokenType} ${access_Token}` 
		},
		body: JSON.stringify({tagName, description, status})
>>>>>>> Stashed changes
	})

	const data = await res.json()

<<<<<<< Updated upstream
	const postCount = data.count

	document.getElementById('postCount').textContent = `count: ${postCount}`
=======
	if (res.ok) {
		Swal.fire({
			icon: 'success',
			title: 'Update Tag Successfully',
			text: data.message,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		}).then(() => {
			fetchTag();
			$('#edittagModal').modal('hide');
		});
	} else {
		const err = await res.json();
		Swal.fire({
			icon: 'error',
			title: `Failed to delete tag: ${err.error || res.statusText}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}

}

async function updatePage(id) {
	const pageName = document.getElementById('edit-page-pageName').value
	const description = document.getElementById('edit-page-description').value
	const status = document.getElementById('edit-page-status').checked

	const res = await fetch(`${baseUrl}/updatePages/${id}`, {
		method: 'PUT',
		headers: { 
			'Content-Type': 'application/json',
			'Authorization': `${tokenType} ${access_Token}` 
		},
		body: JSON.stringify({pageName, description, status})
	})

	const data = await res.json()

	if (res.ok) {
		Swal.fire({
			icon: 'success',
			title: 'Update Page Successfully',
			text: data.message,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		}).then(() => {
			fetchPage();
			$('#editPageModal').modal('hide');
		});
	} else {
		const err = await res.json();
		Swal.fire({
			icon: 'error',
			title: `Failed to delete Page: ${err.error || res.statusText}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}

}

async function updateUser(id) {
	const firstname = document.getElementById('edit-user-firstname').value
	const lastname = document.getElementById('edit-user-lastname').value
	const email = document.getElementById('edit-user-email').value
	const status = document.getElementById('edit-user-status').checked
	const admin = document.getElementById('edit-user-admin').checked

	const res = await fetch(`${baseUrl}/updateUser/${id}`, {
		method: 'PUT',
		headers: { 
			'Content-Type': 'application/json',
			'Authorization': `${tokenType} ${access_Token}` 
		},
		body: JSON.stringify({firstname, lastname, email, status, admin})
	})

	const data = await res.json()

	if (res.ok) {
		Swal.fire({
			icon: 'success',
			title: 'Update User Successfully',
			text: data.message,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		}).then(() => {
			fetchUser();
			$('#editUserModal').modal('hide');
		});
	} else {
		const err = await res.json();
		Swal.fire({
			icon: 'error',
			title: `Failed to delete User: ${err.error || res.statusText}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}

>>>>>>> Stashed changes
}