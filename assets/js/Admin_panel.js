

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

let postEndpoint  = ''


document.addEventListener('DOMContentLoaded', function () {
	fetchActiveUser()
	fetchInActiveUser()
	fetchPage()
	fetchTag()
	fetchLogs()
	fetchDashboard()
	getSideBarRoutes()
	countPost()
	countTag()
	countPage()
	countUser()
	viewProfile()
	editProfile()
	fetchRole('.add-user-role')
	fetchRole('.edit-user-role')

	const selectAll = document.getElementById('select-all');
	const deleteBtn = document.getElementById('delete-all-btn');

	function updateDeleteButtonVisibility() {
      const selectedCheckboxes = document.querySelectorAll('.row-checkbox:checked');
      if (selectedCheckboxes.length > 0) {
        deleteBtn.classList.remove('d-none');
      } else {
        deleteBtn.classList.add('d-none');
      }
    }

    selectAll.addEventListener('change', function () {
      const checkboxes = document.querySelectorAll('.row-checkbox');
      checkboxes.forEach(checkbox => {
        checkbox.checked = selectAll.checked;
      });
	  updateDeleteButtonVisibility()
    });

	 document.addEventListener('change', function (e) {
      if (e.target.classList.contains('row-checkbox')) {
        const all = document.querySelectorAll('.row-checkbox');
        const checked = document.querySelectorAll('.row-checkbox:checked');
        selectAll.checked = all.length === checked.length;

		  updateDeleteButtonVisibility()
      }
    });

	const selectAllTag = document.getElementById('select-all-tag');
	const deleteBtnTag = document.getElementById('delete-all-btn-tag');

	function updateTagDeleteButtonVisibility() {
      const selectedCheckboxes = document.querySelectorAll('.row-checkbox:checked');
      if (selectedCheckboxes.length > 0) {
        deleteBtnTag.classList.remove('d-none');
      } else {
        deleteBtnTag.classList.add('d-none');
      }
    }

    selectAllTag.addEventListener('change', function () {
      const checkboxes = document.querySelectorAll('.row-checkbox');
      checkboxes.forEach(checkbox => {
        checkbox.checked = selectAllTag.checked;
      });
	  updateTagDeleteButtonVisibility()
    });

	 document.addEventListener('change', function (e) {
      if (e.target.classList.contains('row-checkbox')) {
        const all = document.querySelectorAll('.row-checkbox');
        const checked = document.querySelectorAll('.row-checkbox:checked');
        selectAllTag.checked = all.length === checked.length;

		  updateTagDeleteButtonVisibility()
      }
    });

	const selectAllPage = document.getElementById('select-all-page');
	const deleteBtnPage = document.getElementById('delete-all-btn-page');

	function updatePageDeleteButtonVisibility() {
      const selectedCheckboxes = document.querySelectorAll('.row-checkbox:checked');
      if (selectedCheckboxes.length > 0) {
        deleteBtnPage.classList.remove('d-none');
      } else {
        deleteBtnPage.classList.add('d-none');
      }
    }

    selectAllPage.addEventListener('change', function () {
      const checkboxes = document.querySelectorAll('.row-checkbox');
      checkboxes.forEach(checkbox => {
        checkbox.checked = selectAllPage.checked;
      });
	  updatePageDeleteButtonVisibility()
    });

	 document.addEventListener('change', function (e) {
      if (e.target.classList.contains('row-checkbox')) {
        const all = document.querySelectorAll('.row-checkbox');
        const checked = document.querySelectorAll('.row-checkbox:checked');
        selectAllPage.checked = all.length === checked.length;

		  updatePageDeleteButtonVisibility()
      }
    });

		const selectAllUser = document.getElementById('select-all-user');
	const deleteBtnUser = document.getElementById('delete-all-btn-user');

	function updateUserDeleteButtonVisibility() {
      const selectedCheckboxes = document.querySelectorAll('.row-checkbox:checked');
      if (selectedCheckboxes.length > 0) {
        deleteBtnUser.classList.remove('d-none');
      } else {
        deleteBtnUser.classList.add('d-none');
      }
    }

    selectAllUser.addEventListener('change', function () {
      const checkboxes = document.querySelectorAll('.row-checkbox');
      checkboxes.forEach(checkbox => {
        checkbox.checked = selectAllUser.checked;
      });
	  updateUserDeleteButtonVisibility()
    });

	 document.addEventListener('change', function (e) {
      if (e.target.classList.contains('row-checkbox')) {
        const all = document.querySelectorAll('.row-checkbox');
        const checked = document.querySelectorAll('.row-checkbox:checked');
        selectAllUser.checked = all.length === checked.length;

		  updateUserDeleteButtonVisibility()
      }
    });
})


document.addEventListener('endpointsReady', function(e) {
	postEndpoint = e.detail.post

	fetchPost()
})

const prefix = 'api/v1'
const baseUrl = `http://localhost:8000/${prefix}`

const tokenType = localStorage.getItem('tokenType')
const access_Token = localStorage.getItem('token')

let currentPage = 1;
const limit = 5;
let totalPages = 1;

let currentTagPage = 1;
const tagLimit = 5;
let totalTagPages = 1;

let currentPagePage = 1;
const pageLimit = 5;
let totalPagePages = 1;

let currentUserPage = 1;
const userLimit = 5;
let totalUserPages = 1;

let currentLogsPage = 1;
const logsLimit = 5;
let totallogsPages = 1;

let filters = {
	status: "",
	date: "",
};

let filterTag = {
	statusTag: "",
	dateTag: "",
};

let filterPage = {
	statusPage: "",
	datePage: "",
};

let filterUser = {
	statusUser: "",
	dateUser: "",
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

	const res = await fetch(`${baseUrl}/getPublishedPost?${queryParams.toString()}`, {
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
			<td>
				<div class="form-check">
					<input class="form-check-input row-checkbox" type="checkbox" />
				</div>
			</td>
			<th scope="row">${(currentPage - 1) * limit + index + 1}</th>
			<td>${item.title}</td>
			<td>${item.description}</td>
			<td>
				<img 
					src="${item.image}" 
					alt="User Image" 
					width="50" 
					height="50" 
					style="object-fit: cover; border-radius: 50%;" 
					/>
			</td>
			<td>${item.status ? 'Published' : 'unPublished'}</td>
			<td>${new Date(item.createdAt).toISOString().split('T')[0]}</td>
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

function searchfilter(){
	filterTag.statusTag = document.getElementById('TagstatusFilter').value;
	filterTag.dateTag = document.getElementById('Tagdate').value;

	currentTagPage = 1;
	fetchTag();
}
function searchfilterPage(){
	filterPage.statusPage = document.getElementById('PageStatusFilter').value;
	filterPage.datePage = document.getElementById('PageDate').value;

	currentPagePage = 1;
	fetchPage();
}

function searchfilterUser(){
	filterUser.statusUser = document.getElementById('UserStatusFilter').value;
	filterUser.dateUser = document.getElementById('dateUser').value;
	fetchUser();
}

function clearFilters() {
	document.getElementById('statusFilter').value = "";
	document.getElementById('date').value = "";

	filters.status = "";
	filters.date = "";

	currentPage = 1;

}

function TagClearFilters() {
	document.getElementById('TagstatusFilter').value = "";
	document.getElementById('Tagdate').value = "";

	filterTag.statusTag = "";
	filterTag.dateTag = "";
	currentTagPage = 1;

}

function PageClearFilters() {
	document.getElementById('PageStatusFilter').value = "";
	document.getElementById('PageDate').value = "";

	filterPage.statusPage = "";
	filterPage.datePage = "";
	currentPagePage = 1;

}

function UserclearFilters() {
	document.getElementById('UserStatusFilter').value = "";
	document.getElementById('dateUser').value = "";

	filterUser.statusUser = "";
	filterUser.dateUser = "";
	currentUserPage = 1;

}

function resetFilters() {
	document.getElementById('statusFilter').value = "";
	document.getElementById('date').value = "";

	filters.status = "";
	filters.date = "";

	currentPage = 1;
	fetchPost();
	countPost()	
}

function TagResetFilters() {
	document.getElementById('TagstatusFilter').value = "";
	document.getElementById('Tagdate').value = "";

	filterTag.statusTag = "";
	filterTag.dateTag = "";

	currentTagPage = 1;
	fetchTag();
	countTag()	
}

function PageResetFilters() {
	document.getElementById('PageStatusFilter').value = "";
	document.getElementById('PageDate').value = "";

	filterPage.statusPage = "";
	filterPage.datePage = "";

	currentPagePage = 1;
	fetchPage();
	countPage()	
}

function UserResetFilters() {
	document.getElementById('UserStatusFilter').value = "";
	document.getElementById('dateUser').value = "";

	filterUser.statusUser = "";
	filterUser.dateUser = "";

	currentUserPage = 1;
	fetchUser();
	countUser()	
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

function renderTagPaginationButtons(total) {
	const pagination = document.getElementById('tagPagination');
	pagination.innerHTML = '';

	const prev = document.createElement('li');
	prev.className = `page-item ${currentTagPage === 1 ? 'disabled' : ''}`;
	prev.innerHTML = `<a class="page-link" href="#">Previous</a>`;
	prev.onclick = (e) => {
		e.preventDefault();
		if (currentTagPage > 1) fetchTag(currentTagPage - 1);
	};
	pagination.appendChild(prev);

	for (let i = 1; i <= total; i++) {
		const pageBtn = document.createElement('li');
		pageBtn.className = `page-item ${i === currentTagPage ? 'active' : ''}`;
		pageBtn.innerHTML = `<a class="page-link" href="#">${i}</a>`;
		pageBtn.onclick = (e) => {
			e.preventDefault();
			fetchTag(i);
		};
		pagination.appendChild(pageBtn);
	}

	const next = document.createElement('li');
	next.className = `page-item ${currentTagPage === total ? 'disabled' : ''}`;
	next.innerHTML = `<a class="page-link" href="#">Next</a>`;
	next.onclick = (e) => {
		e.preventDefault();
		if (currentTagPage < total) fetchTag(currentTagPage + 1);
	};
	pagination.appendChild(next);
}

function renderpagePaginationButtons(total) {
	const pagination = document.getElementById('pagePagination');
	pagination.innerHTML = '';

	const prev = document.createElement('li');
	prev.className = `page-item ${currentPagePage === 1 ? 'disabled' : ''}`;
	prev.innerHTML = `<a class="page-link" href="#">Previous</a>`;
	prev.onclick = (e) => {
		e.preventDefault();
		if (currentPagePage > 1) fetchPage(currentPagePage - 1);
	};
	pagination.appendChild(prev);

	for (let i = 1; i <= total; i++) {
		const pageBtn = document.createElement('li');
		pageBtn.className = `page-item ${i === currentPagePage ? 'active' : ''}`;
		pageBtn.innerHTML = `<a class="page-link" href="#">${i}</a>`;
		pageBtn.onclick = (e) => {
			e.preventDefault();
			fetchPage(i);
		};
		pagination.appendChild(pageBtn);
	}

	const next = document.createElement('li');
	next.className = `page-item ${currentPagePage === total ? 'disabled' : ''}`;
	next.innerHTML = `<a class="page-link" href="#">Next</a>`;
	next.onclick = (e) => {
		e.preventDefault();
		if (currentPagePage < total) fetchPage(currentPagePage + 1);
	};
	pagination.appendChild(next);
}
function renderUserPaginationButtons(total) {
	const pagination = document.getElementById('userPagination');
	pagination.innerHTML = '';

	const prev = document.createElement('li');
	prev.className = `page-item ${currentUserPage === 1 ? 'disabled' : ''}`;
	prev.innerHTML = `<a class="page-link" href="#">Previous</a>`;
	prev.onclick = (e) => {
		e.preventDefault();
		if (currentUserPage > 1) fetchUser(currentUserPage - 1);
	};
	pagination.appendChild(prev);

	for (let i = 1; i <= total; i++) {
		const pageBtn = document.createElement('li');
		pageBtn.className = `page-item ${i === currentUserPage ? 'active' : ''}`;
		pageBtn.innerHTML = `<a class="page-link" href="#">${i}</a>`;
		pageBtn.onclick = (e) => {
			e.preventDefault();
			fetchUser(i);
		};
		pagination.appendChild(pageBtn);
	}

	const next = document.createElement('li');
	next.className = `page-item ${currentUserPage === total ? 'disabled' : ''}`;
	next.innerHTML = `<a class="page-link" href="#">Next</a>`;
	next.onclick = (e) => {
		e.preventDefault();
		if (currentUserPage < total) fetchUser(currentUserPage + 1);
	};
	pagination.appendChild(next);
}

document.getElementById('searchInput')?.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		currentPage = 1;
		fetchPost();
	}
});

document.getElementById('searchInput')?.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		currentTagPage = 1;
		fetchTag();
	}
});

document.getElementById('sortSelect')?.addEventListener('change', () => {
	currentPage = 1;
	fetchPost();
});

document.getElementById('sortSelect')?.addEventListener('change', () => {
	currentTagPage = 1;
	fetchTag();
});

document.getElementById('searchInput')?.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		currentPagePage = 1;
		fetchPage();
	}
});

document.getElementById('sortSelect')?.addEventListener('change', () => {
	currentPagePage = 1;
	fetchPage();
});

document.getElementById('sortSelect')?.addEventListener('change', () => {
	currentUserPage = 1;
	fetchUser();
});

document.getElementById('searchInput')?.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		currentUserPage = 1;
		fetchUser();
	}
});


async function fetchTag(page = 1) {

	currentTagPage = page;
	const sortValue = document.getElementById('sortSelectTag')?.value || "";
	const searchInputTag = document.getElementById('searchInputTag')?.value || "";

	const queryParams = new URLSearchParams({
		search: searchInputTag,
		sort: sortValue,
		page: currentTagPage,
		limit,
		status: filterTag.statusTag,
		date: filterTag.dateTag
	})

	const res = await fetch(`${baseUrl}/getTag?${queryParams.toString()}`, {
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
	if (!data.success || tag.length === 0) {
		list.innerHTML = '<tr><td colspan="7" class="text-center">No record found</td></tr>';
		document.getElementById('tagPagination').innerHTML = '';
		return;
	}

	tag.forEach((item, index) => {

		list.innerHTML += `
		<tr>
		<td>
				<div class="form-check">
					<input class="form-check-input row-checkbox" type="checkbox" />
				</div>
			</td>
			<th scope="row">${(currentTagPage - 1) * limit + index + 1}</th>
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
			<li><a onclick="viewTag('${item._id}')" class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#viewTagModal"> <i class="fas fa-eye me-2 text-warning"></i> View</a></li>
			<a onclick="editTag('${item._id}')" class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edittagModal">
		<i class="fas fa-edit me-2 text-info"></i> Edit
		</a>
			<li><a class="dropdown-item" href="#" onclick="deleteTag('${item._id}')"><i class="fas fa-trash-alt me-2 text-danger"></i> Delete</a></li>
		</ul>
			</tr>
		`;
	})
	totalTagPages = data.pagination.totalPages;
	renderTagPaginationButtons(totalTagPages);

}

async function fetchLogs(page = 1) {	
	 currentLogsPage = page;
	 const queryParams = new URLSearchParams({
        page: currentLogsPage,
        limit       
    });

	const res = await fetch(`${baseUrl}/getLogs?${queryParams.toString()}`, {
		method: "GET",
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	const loglist = data.data

	console.log('FETCH LOG', loglist);


	const listlog = document.getElementById('loglist')
	const pagination = document.getElementById('logsPagination');

	listlog.innerHTML = '';
	if (!data.success || !loglist || loglist.length === 0) {
                listlog.innerHTML = `
                    <tr>
                        <td colspan="7" class="text-center text-danger fw-bold">
                            ${data.error || "No logs found"}
                        </td>
                    </tr>
                `;
                pagination.innerHTML = '';
                return;
            }

	loglist.forEach((item, index) => {

		listlog.innerHTML += `
		<tr>
		
			<th scope="row">${(currentLogsPage - 1) * limit + index + 1}</th>
			<td>${item.user_id && item.user_id.firstname ? item.user_id.firstname : '----------'}</td>
            <td>${item.login_time ? new Date(item.login_time).toLocaleTimeString() : '----------'}</td>
            <td>${item.logout_time ? new Date(item.logout_time).toLocaleTimeString() : '----------'}</td>
			<td>${new Date(item.createdAt).toISOString().split('T')[0]}</td>
			<td>${new Date(item.updatedAt).toISOString().split('T')[0]}</td>
			
		
			</tr>
		`;
	})

	 totalPagePages = data.pagination.totalPages;
    renderLogsPaginationButtons(totalPagePages);

}

function renderLogsPaginationButtons(total) {
    const pagination = document.getElementById('logsPagination');
    pagination.innerHTML = '';

    const prev = document.createElement('li');
    prev.className = `page-item ${currentLogsPage === 1 ? 'disabled' : ''}`;
    prev.innerHTML = `<a class="page-link" href="#">Previous</a>`;
    prev.onclick = (e) => {
        e.preventDefault();
        if (currentLogsPage > 1) fetchLogs(currentLogsPage - 1);
    };
    pagination.appendChild(prev);

    function createPageButton(page) {
        const pageBtn = document.createElement('li');
        pageBtn.className = `page-item ${page === currentLogsPage ? 'active' : ''}`;
        pageBtn.innerHTML = `<a class="page-link" href="#">${page}</a>`;
        pageBtn.onclick = (e) => {
            e.preventDefault();
            fetchLogs(page);
        };
        pagination.appendChild(pageBtn);
    }

    let maxVisible = 5;
    let startPage = Math.max(1, currentLogsPage - 2);
    let endPage = Math.min(total, currentLogsPage + 2);

    if (endPage - startPage < maxVisible - 1) {
        if (startPage === 1) {
            endPage = Math.min(total, startPage + maxVisible - 1);
        } else if (endPage === total) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }
    }

    if (startPage > 1) {
        createPageButton(1);
        if (startPage > 2) {
            const dots = document.createElement('li');
            dots.className = 'page-item disabled';
            dots.innerHTML = `<a class="page-link">...</a>`;
            pagination.appendChild(dots);
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        createPageButton(i);
    }

    if (endPage < total) {
        if (endPage < total - 1) {
            const dots = document.createElement('li');
            dots.className = 'page-item disabled';
            dots.innerHTML = `<a class="page-link">...</a>`;
            pagination.appendChild(dots);
        }
        createPageButton(total);
    }

    const next = document.createElement('li');
    next.className = `page-item ${currentLogsPage === total ? 'disabled' : ''}`;
    next.innerHTML = `<a class="page-link" href="#">Next</a>`;
    next.onclick = (e) => {
        e.preventDefault();
        if (currentLogsPage < total) fetchLogs(currentLogsPage + 1);
    };
    pagination.appendChild(next);
}




async function fetchPage(page = 1) {
	
	currentPagePage = page;

	const sortValue = document.getElementById('sortSelectPage')?.value || "";
	const searchInputpage = document.getElementById('searchInputpage')?.value || "";

	const queryParams = new URLSearchParams({
		search: searchInputpage,
		sort: sortValue,
		page: currentPagePage,
		limit,
		status: filterPage.statusPage,
		date: filterPage.datePage
	})
	const res = await fetch(`${baseUrl}/getPages?${queryParams.toString()}`, {
		method: "GET",
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	const pages = data.data

	console.log('FETCH PAGE', page);


	const list = document.getElementById('pagelist')

	list.innerHTML = '';
	if (!data.success || tag.length === 0) {
		list.innerHTML = '<tr><td colspan="7" class="text-center">No record found</td></tr>';
		document.getElementById('pagePagination').innerHTML = '';
		return;
	}

	pages.forEach((item, index) => {

		list.innerHTML += `
		<tr>
		<td>
				<div class="form-check">
					<input class="form-check-input row-checkbox" type="checkbox" />
				</div>
			</td>
			<th scope="row">${(currentPagePage - 1) * limit + index + 1}</th>
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
			<li><a onclick="viewPage('${item._id}')" class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#viewPageModal"> <i class="fas fa-eye me-2 text-warning"></i> View</a></li>
			<a onclick="editPage('${item._id}')" class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#editPageModal">
		<i class="fas fa-edit me-2 text-info"></i> Edit
		</a>
			<li><a class="dropdown-item" href="#" onclick="deletePage('${item._id}')"><i class="fas fa-trash-alt me-2 text-danger"></i> Delete</a></li>
		</ul>
			</tr>
		`;
	})
	totalPagePages = data.pagination.totalPages;
	renderpagePaginationButtons(totalPagePages);

}

async function fetchActiveUser() {

	const res = await fetch(`${baseUrl}/getActiveUser`, {
		method: "GET",
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	const user = data.data

	console.log('FETCH USER', user);


	const list = document.getElementById('ActiveUserList')

	list.innerHTML = '';
	if (!data.success || tag.length === 0) {
		list.innerHTML = '<tr><td colspan="7" class="text-center">No record found</td></tr>';
		return;
	}

	user.forEach((item, index) => {

		list.innerHTML += `
		<tr>
		<td>
				<div class="form-check">
					<input class="form-check-input row-checkbox" type="checkbox" />
				</div>
			</td>
			<th scope="row">${(currentUserPage - 1) * limit + index + 1}</th>
			<td>${item.firstname} ${item.lastname}</td>
			<td>${item.email}</td>
			<td>${item.active ? 'active' : 'inActive'}</td>
			<td>${item.is_admin ? 'admin' : 'notAdmin'}</td>
			<td>${item.role}</td>
			<td>${new Date(item.createdAt).toISOString().split('T')[0]}</td>
			<td>${new Date(item.updatedAt).toISOString().split('T')[0]}</td>
			<td><div class="dropdown">
		<button class="btn border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
			&#8942;
		</button>
		<ul class="dropdown-menu">
			<li><a onclick="viewUser('${item._id}')" class="dropdown-item" href="#"  data-bs-toggle="modal" data-bs-target="#viewUserModal"> <i class="fas fa-eye me-2 text-warning"></i> View</a></li>
			<a onclick="editUser('${item._id}')" class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#editUserActiveModal">
		<i class="fas fa-edit me-2 text-info"></i> Edit
		</a>
			<li><a class="dropdown-item" href="#" onclick="deleteUser('${item._id}')"><i class="fas fa-trash-alt me-2 text-danger"></i> Delete</a></li>
		</ul>
			</tr>
		`;
	})
	

}

async function fetchInActiveUser() {

	
	
	const res = await fetch(`${baseUrl}/getInActiveUser`, {
		method: "GET",
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	const user = data.data

	console.log('FETCH USER', user);


	const list = document.getElementById('InActiveUserList')

	list.innerHTML = '';
	if (!data.success || tag.length === 0) {
		list.innerHTML = '<tr><td colspan="7" class="text-center">No record found</td></tr>';
		return;
	}

	user.forEach((item, index) => {

		list.innerHTML += `
		<tr>
		<td>
				<div class="form-check">
					<input class="form-check-input row-checkbox" type="checkbox" />
				</div>
			</td>
			<th scope="row">${(currentUserPage - 1) * limit + index + 1}</th>
			<td>${item.firstname} ${item.lastname}</td>
			<td>${item.email}</td>
			<td>${item.active ? 'active' : 'inActive'}</td>
			<td>${item.is_admin ? 'admin' : 'notAdmin'}</td>
			<td>${item.role}</td>
			<td>${new Date(item.createdAt).toISOString().split('T')[0]}</td>
			<td>${new Date(item.updatedAt).toISOString().split('T')[0]}</td>
			<td><div class="dropdown">
		<button class="btn border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
			&#8942;
		</button>
		<ul class="dropdown-menu">
			<li><a  onclick="viewUser('${item._id}')" class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#viewUserModal"> <i class="fas fa-eye me-2 text-warning"></i> View</a></li>
			<a onclick="editUser('${item._id}')" class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#editUserActiveModal">
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

	const role = Number(localStorage.getItem('role')) || 0

	const sideBarRoutes = data.data || []

	const sideBarRouteslist = document.getElementById('sideBarRoutes')

	sideBarRouteslist.innerHTML = '';

	const filteredRoutes = (sideBarRoutes || []).filter(route => {
	const routeRole = route?.role;
	if (!routeRole) return false;
	return Array.isArray(routeRole)
		? routeRole.includes(role)
		: Number(routeRole) === role;
	});

	filteredRoutes.forEach((item, index) => {
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
		method: 'POST',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
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
		localStorage.removeItem('role')


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
				countPost();
			});

		} else {
			Swal.fire({
				icon: 'error',
				title: `Failed to delete post: ${data.error || res.statusText}`,
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
				countTag()
			});

		} else {
			Swal.fire({
				icon: 'error',
				title: `Failed to delete post: ${data.error || res.statusText}`,
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
				countPage()
			});

		} else {
			Swal.fire({
				icon: 'error',
				title: `Failed to delete post: ${data.error || res.statusText}`,
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
				fetchActiveUser();
				fetchInActiveUser()
				countUser()
			});

		} else {
			Swal.fire({
				icon: 'error',
				title: `Failed to delete post: ${data.error || res.statusText}`,
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
	const image = document.getElementById('PostImageInput').files[0]; 

	const formData = new FormData();
	formData.append("title", title);
	formData.append("description", description);
	if (image) {
		formData.append("image", image);
	}

	document.getElementById('error-title').textContent = ""

	let isValid = true;

	 if (!title) {
        document.getElementById('error-title').textContent = 'Title is required.';
        isValid = false;
    } 

	 if (!isValid) {
        return;
    }



	const res = await fetch(`${baseUrl}/addPost`, {
		method: 'POST',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		},
		body: formData
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
			countPost()
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

	document.getElementById('error-tag-Name').textContent = ""

	let isValid = true;

	 if (!tagName) {
        document.getElementById('error-tag-Name').textContent = 'TagName is required.';
        isValid = false;
    } 

	 if (!isValid) {
        return;
    }

	

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
			countTag()
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

	document.getElementById('error-pageName').textContent = ""

	let isValid = true;

	 if (!pageName) {
        document.getElementById('error-pageName').textContent = 'PageName is required.';
        isValid = false;
    } 

	 if (!isValid) {
        return;
    }

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
			countPage();
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
	const role = document.querySelector('.add-user-role').value;

	document.getElementById('firstName-error').textContent = ""
  	document.getElementById('lastName-error').textContent = ""
	document.getElementById('email-error').textContent = ""
  	document.getElementById('password-error').textContent = ""
	document.getElementById('confirmpassword-error').textContent = ""

  let isValid = true;
	if (!firstname){
		document.getElementById('firstName-error').textContent = 'firstName is required.';
        isValid = false;
	}
	if(!lastname){
		document.getElementById('lastName-error').textContent = 'lastName is required.';
        isValid = false;
	}
    if (!email) {
        document.getElementById('email-error').textContent = 'Email is required.';
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        document.getElementById('email-error').textContent = 'Please enter a valid email address.';
        isValid = false;
    }

    if (!password) {
        document.getElementById('password-error').textContent = 'Password is required.';
        isValid = false;
    } else if (password.length < 10) {
        document.getElementById('password-error').textContent = 'Password must be at least 10 characters';
        isValid = false;
    }
	if (!confirmPass) {
        document.getElementById('confirmpassword-error').textContent = 'Confirmpassword is required.';
        isValid = false;
	} else if (password !== confirmPass) {
        document.getElementById('confirmpassword-error').textContent = "password does'nt match";
        isValid = false;
    
    } else if (password.length < 10) {
        document.getElementById('confirmpassword-error').textContent = 'Confirmpassword must be at least 10 characters';
        isValid = false;
    }
    if (!isValid) {
        return;
    }

	const res = await fetch(`${baseUrl}/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `${tokenType} ${access_Token}`
		},
		body: JSON.stringify({ firstname, lastname, email, password, confirmPass,role })
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
			fetchActiveUser();
			fetchInActiveUser()
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

document.getElementById('editPostForm').addEventListener('submit', function (e) {
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

	if (res.ok && data.success && data.data.length > 0) {
		const post = data.data[0]
		document.getElementById('edit-post-id').value = post._id
		document.getElementById('edit-post-title').value = post.title
		document.getElementById('edit-post-description').value = post.description
		document.getElementById('edit-post-status').checked = post.status
			const postimagePreview = document.getElementById("edit-post-image-preview");
		if (post.image) {
			postimagePreview.src = `${post.image.replace(/\\/g, "/")}`;
		} else {
			postimagePreview.src = "assets/default-user.png"; 
		}

		const fileInputPost = document.getElementById("edit-post-image");
		
		fileInputPost.value = ""; 

		fileInputPost.addEventListener("change", function (e) {
			const postfile = e.target.files[0];
			if (postfile) {
				const postReader = new FileReader();
				postReader.onload = function (e) {
					postimagePreview.src = e.target.result; 
				};
				postReader.readAsDataURL(postfile);
			}
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

document.getElementById('editTagForm').addEventListener('submit', function (e) {
	e.preventDefault()
	const id = document.getElementById('edit-tag-id').value
	updateTag(id)
})

document.getElementById('editPageForm').addEventListener('submit', function (e) {
	e.preventDefault()
	const id = document.getElementById('edit-page-id').value
	updatePage(id)
})

document.getElementById('editUserForm').addEventListener('submit', function (e) {
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

	if (res.ok && data.success && data.data.length > 0) {
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

	if (res.ok && data.success && data.data.length > 0) {
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

	if (res.ok && data.success && data.data.length > 0) {
		const user = data.data[0]
		document.getElementById('edit-user-id').value = user._id
		document.getElementById('edit-user-firstname').value = user.firstname
		document.getElementById('edit-user-lastname').value = user.lastname
		document.getElementById('edit-user-email').value = user.email
		document.getElementById('edit-user-status').checked = user.active
		document.getElementById('edit-user-admin').checked = user.is_admin
		document.querySelector('.edit-user-role').value = user.role

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

	if (res.ok && data.success && data.data.length > 0) {
		const view = data.data[0]

		document.getElementById('view-post-id').innerHTML = `<strong>ID: </strong> <span> ${view._id} </span>`
		document.getElementById('view-post-title').innerHTML = `<strong>Title: </strong> <span> ${view.title} </span>`
		document.getElementById('view-post-description').innerHTML = `<strong>Description: </strong> <span> ${view.description} </span>`
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

async function viewProfile() {
	const userId = localStorage.getItem('user')
	const res = await fetch(`${baseUrl}/viewProfileById/${userId}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	if (res.ok && data.success && data.data.length > 0) {
		const view = data.data[0]

		
		document.getElementById('view-profile-fullname').innerHTML = `<span> ${view.firstname} ${view.lastname} </span>`
		document.getElementById('view-profile-email').innerHTML = `<span> ${view.email} </span>`
		document.getElementById('view-profile-phone').innerHTML = `<span> ${view.phone ? view.phone : '----------' } </span>`
		document.getElementById('view-profile-address').innerHTML = `<span> ${view.address ? view.address : '----------'} </span>`
		
	} else {
		Swal.fire({
			icon: 'error',
			title: `Failed to delete profile: ${data.error || res.statusText}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}
}

async function editProfile() {
	const userId = localStorage.getItem('user')

	const res = await fetch(`${baseUrl}/editProfileById/${userId}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	if (res.ok && data.success && data.data.length > 0) {
		const view = data.data[0]

		document.getElementById('edit-profile-firstname').value = view.firstname
		document.getElementById('edit-profile-lastname').value = view.lastname
		document.getElementById('edit-profile-email').value = view.email
		document.getElementById('edit-profile-phone').value = view.phone
		document.getElementById('edit-profile-address').value = view.address

	
	} else {
		Swal.fire({
			icon: 'error',
			title: `Failed to edit profile: ${data.error || res.statusText}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}
}


async function viewTag(id) {
	
	const res = await fetch(`${baseUrl}/viewTagById/${id}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	if(res.ok && data.success && data.data.length > 0) {
		const view = data.data[0]

		document.getElementById('view-tag-id').innerHTML = `<strong>ID: </strong> <span> ${view._id} </span>`
		document.getElementById('view-tag-tagName').innerHTML =  `<strong>tagName: </strong> <span> ${view.tagName} </span>`
		document.getElementById('view-tag-description').innerHTML =  `<strong>Description: </strong> <span> ${view.description} </span>`
		document.getElementById('view-tag-status').innerHTML = `<strong>Status: </strong> <span> ${view.status ? 'Active' : 'InActive'} </span>`
		document.getElementById('view-tag-createdAt').innerHTML = `<strong>CreatedAt: </strong> <span> ${new Date(view.createdAt).toISOString().split('T')[0]} </span>`
		document.getElementById('view-tag-updatedAt').innerHTML = `<strong>UpdatedAt: </strong> <span> ${new Date(view.updatedAt).toISOString().split('T')[0]} </span>`
	} else{
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

async function viewPage(id) {
	
	const res = await fetch(`${baseUrl}/viewPagesById/${id}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	if(res.ok && data.success && data.data.length > 0) {
		const view = data.data[0]

		document.getElementById('view-page-id').innerHTML = `<strong>ID: </strong> <span> ${view._id} </span>`
		document.getElementById('view-page-pageName').innerHTML =  `<strong>pageName: </strong> <span> ${view.pageName} </span>`
		document.getElementById('view-page-description').innerHTML =  `<strong>Description: </strong> <span> ${view.description} </span>`
		document.getElementById('view-page-status').innerHTML = `<strong>Status: </strong> <span> ${view.status ? 'Active' : 'InActive'} </span>`
		document.getElementById('view-page-createdAt').innerHTML = `<strong>CreatedAt: </strong> <span> ${new Date(view.createdAt).toISOString().split('T')[0]} </span>`
		document.getElementById('view-page-updatedAt').innerHTML = `<strong>UpdatedAt: </strong> <span> ${new Date(view.updatedAt).toISOString().split('T')[0]} </span>`
	} else{
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

async function viewUser(id) {
	
	const res = await fetch(`${baseUrl}/viewUserById/${id}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	if(res.ok && data.success && data.data.length > 0) {
		const view = data.data[0]

		document.getElementById('view-user-id').innerHTML = `<strong>ID: </strong> <span> ${view._id} </span>`
		document.getElementById('view-user-FullName').innerHTML =  `<strong>FullName: </strong> <span> ${view.firstname} ${view.lastname} </span>`
		document.getElementById('view-user-Email').innerHTML =  `<strong>Email: </strong> <span> ${view.email} </span>`
		document.getElementById('view-user-createdAt').innerHTML = `<strong>CreatedAt: </strong> <span> ${new Date(view.createdAt).toISOString().split('T')[0]} </span>`
		document.getElementById('view-user-updatedAt').innerHTML = `<strong>UpdatedAt: </strong> <span> ${new Date(view.updatedAt).toISOString().split('T')[0]} </span>`
	} else{
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
}


async function updatePost(id) {
	const title = document.getElementById('edit-post-title').value
	const description = document.getElementById('edit-post-description').value
	const postImageFile = document.getElementById('edit-post-image').files[0];
	const status = document.getElementById('edit-post-status').checked

	const formData = new FormData();
	formData.append("title", title);
	formData.append("description", description);
	formData.append("status", status);

	if (postImageFile) {
		formData.append("image", postImageFile); 
	}


	const res = await fetch(`${baseUrl}/updatePost/${id}`, {
		method: 'PUT',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		},
		body: formData
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
		body: JSON.stringify({ tagName, description, status })
	})

	const data = await res.json()

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
		body: JSON.stringify({ pageName, description, status })
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
	const active = document.getElementById('edit-user-status').checked
	const is_admin = document.getElementById('edit-user-admin').checked
	const role = document.querySelector('.edit-user-role').value

	const res = await fetch(`${baseUrl}/updateUser/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `${tokenType} ${access_Token}`
		},
		body: JSON.stringify({ firstname, lastname, email, active, is_admin,role })
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
			fetchActiveUser();
			fetchInActiveUser()
			$('#editUserActiveModal').modal('hide');
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

}

// document.getElementById('searchInput').addEventListener('input', function () {
//   const search = this.value.trim();
//   countPost(search);
// });

function getSearchParamsAndCount() {
  const search = document.getElementById('searchInput').value.trim();
  const status = document.getElementById('statusFilter')?.value || "";
  const date = document.getElementById('date')?.value || "";

  countPost(search, status, date);
}

document.getElementById('searchInput').addEventListener('input', getSearchParamsAndCount);

document.getElementById('statusFilter').addEventListener('change', getSearchParamsAndCount);

document.getElementById('date').addEventListener('change', getSearchParamsAndCount);

function getSearchParamsAndCountTag(){
	const search = document.getElementById('searchInputTag').value.trim();
 	const status = document.getElementById('TagstatusFilter')?.value || "";
  	const date = document.getElementById('Tagdate')?.value || "";
	countTag(search,status,date)	
}
document.getElementById('searchInputTag').addEventListener('input', getSearchParamsAndCountTag);
document.getElementById('TagstatusFilter').addEventListener('change', getSearchParamsAndCountTag);

document.getElementById('Tagdate').addEventListener('change', getSearchParamsAndCountTag);

function getSearchParamsAndCountPage(){
	const search = document.getElementById('searchInputpage').value.trim();
	const status = document.getElementById('PageStatusFilter')?.value || "";
  	const date = document.getElementById('PageDate')?.value || "";

	countPage(search,status,date)	
}

document.getElementById('PageStatusFilter').addEventListener('change', getSearchParamsAndCountPage);

document.getElementById('PageDate').addEventListener('change', getSearchParamsAndCountPage);
document.getElementById('searchInputpage').addEventListener('input', getSearchParamsAndCountPage);

function getSearchParamsAndCountUser(){
	const status = document.getElementById('UserStatusFilter')?.value || "";
  	const date = document.getElementById('dateUser')?.value || "";
	const search = document.getElementById('searchInputuser').value.trim();

	countUser(search,status,date)	
}

document.getElementById('UserStatusFilter').addEventListener('change', getSearchParamsAndCountUser);

document.getElementById('dateUser').addEventListener('change', getSearchParamsAndCountUser);
document.getElementById('searchInputuser').addEventListener('input', getSearchParamsAndCountUser);


async function countPost(search = "", status = "", date = "") {
	
	const queryParams = new URLSearchParams();

	if (search) queryParams.append("search", search);
	if (status) queryParams.append("status", status);
	if (date) queryParams.append("date", date);

	const res = await fetch(`${baseUrl}/countPost?${queryParams.toString()}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		},
	})

	const data = await res.json()

	const count = data.count

	document.getElementById('postCount').textContent = `No Of Count: ${count}`

}

async function countTag(search = "", status = "", date = "") {
	const queryParams = new URLSearchParams();

	if (search) queryParams.append("search", search );
	if (status) queryParams.append("status", status);
	if (date) queryParams.append("date", date);
	const res = await fetch(`${baseUrl}/countTag?${queryParams.toString()}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		},
	})

	const data = await res.json()

	const count = data.count

	document.getElementById('tagCount').textContent = `No Of Count: ${count}`

}
async function countPage(search = "", status = "", date = "") {
	const queryParams = new URLSearchParams();
	if (search) queryParams.append("search", search);
	if (status) queryParams.append("status", status);
	if (date) queryParams.append("date", date);
	const res = await fetch(`${baseUrl}/countPages?${queryParams.toString()}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		},
	})

	const data = await res.json()

	const count = data.count

	document.getElementById('pageCount').textContent = `No Of Count: ${count}`

}
async function countUser(search = "", active = "", date = "") {
	const queryParams = new URLSearchParams();
	if (search) queryParams.append("search", search);
	if (active) queryParams.append("active", active);
	if (date) queryParams.append("date", date);
	const res = await fetch(`${baseUrl}/countUser?${queryParams.toString()}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		},
	})

	const data = await res.json()

	const count = data.count

	document.getElementById('userCount').textContent = `No Of Count: ${count}`

}

async function deleteSelectedPosts() {
  const checkboxes = document.querySelectorAll('.row-checkbox:checked');
  const ids = [];

  checkboxes.forEach((checkbox, index) => {
    const row = checkbox.closest('tr');
    const titleCell = row.querySelector('td:nth-child(3)');
    const title = titleCell?.innerText;

    const editBtn = row.querySelector('.dropdown-menu a[onclick^="editPost"]');
    const idMatch = editBtn?.getAttribute('onclick')?.match(/'([^']+)'/);
    if (idMatch) {
      ids.push(idMatch[1]);
    }
  });

  if (ids.length === 0) {
		Swal.fire({
			icon: 'info',
			title: 'Please select at least one post to delete.',
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
    	return;
  }

  const result = await Swal.fire({
		title: `Are you sure you want to delete ${ids.length} selected post(s)?`,
		text: 'You won\'t be able to revert this!',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#d33',
		cancelButtonColor: '#3085d6',
		confirmButtonText: 'Yes, delete it!',
		cancelButtonText: 'Cancel'
	})

	if (result.isConfirmed) {
		try {
		const res = await fetch(`${baseUrl}/deleteMultiplePost?ids=${ids.join(',')}`, {
			method: "DELETE",
			headers: {
				'Authorization': `${tokenType} ${access_Token}`
			}
		});

    	const data = await res.json();

		if (data.success) {
			Swal.fire({
				icon: 'success',
				title: data.message,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			})
		fetchPost(currentPage)
		countPost()
		document.getElementById('delete-all-btn').classList.add('d-none');
		document.querySelectorAll('.row-checkbox:checked').forEach(cb => cb.checked = false);
		const headerCheckbox = document.querySelector('#select-all'); // **Assumes your header checkbox has an ID of 'selectAllCheckbox'**
        if (headerCheckbox) {
          headerCheckbox.checked = false;
        }

		} else {
			Swal.fire({
				icon: 'success',
				title: data.error || 'Failed to delete posts.',
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			})
		}
  } catch (err) {
	 Swal.fire({
			icon: 'success',
			title: err || 'An error occurred while deleting posts.',
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
  }
	}

 
}

async function deleteSelectedTag() {
  const checkboxes = document.querySelectorAll('.row-checkbox:checked');
  const ids = [];

  checkboxes.forEach((checkbox, index) => {
    const row = checkbox.closest('tr');
    const titleCell = row.querySelector('td:nth-child(3)');
    const title = titleCell?.innerText;

    const editBtn = row.querySelector('.dropdown-menu a[onclick^="editTag"]');
    const idMatch = editBtn?.getAttribute('onclick')?.match(/'([^']+)'/);
    if (idMatch) {
      ids.push(idMatch[1]);
    }
  });

  if (ids.length === 0) {
		Swal.fire({
			icon: 'info',
			title: 'Please select at least one tag to delete.',
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
    	return;
  }

  const result = await Swal.fire({
		title: `Are you sure you want to delete ${ids.length} selected tag(s)?`,
		text: 'You won\'t be able to revert this!',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#d33',
		cancelButtonColor: '#3085d6',
		confirmButtonText: 'Yes, delete it!',
		cancelButtonText: 'Cancel'
	})

	if (result.isConfirmed) {
		try {
		const res = await fetch(`${baseUrl}/deleteMultipleTags?ids=${ids.join(',')}`, {
			method: "DELETE",
			headers: {
				'Authorization': `${tokenType} ${access_Token}`
			}
		});

    	const data = await res.json();

		if (data.success) {
			Swal.fire({
				icon: 'success',
				title: data.message,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			})
		fetchTag(currentPage)
		countTag()
		document.getElementById('delete-all-btn-tag').classList.add('d-none');
		document.querySelectorAll('.row-checkbox:checked').forEach(cb => cb.checked = false);
		const headerCheckbox = document.querySelector('#select-all-tag'); // **Assumes your header checkbox has an ID of 'selectAllCheckbox'**
        if (headerCheckbox) {
          headerCheckbox.checked = false;
        }

		} else {
			Swal.fire({
				icon: 'success',
				title: data.error || 'Failed to delete tag.',
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			})
		}
  } catch (err) {
	 Swal.fire({
			icon: 'success',
			title: err || 'An error occurred while deleting tag.',
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
  }
	}

 
}

async function deleteSelectedPage() {
  const checkboxes = document.querySelectorAll('.row-checkbox:checked');
  const ids = [];

  checkboxes.forEach((checkbox, index) => {
    const row = checkbox.closest('tr');
    const titleCell = row.querySelector('td:nth-child(3)');
    const title = titleCell?.innerText;

    const editBtn = row.querySelector('.dropdown-menu a[onclick^="editPage"]');
    const idMatch = editBtn?.getAttribute('onclick')?.match(/'([^']+)'/);
    if (idMatch) {
      ids.push(idMatch[1]);
    }
  });

  if (ids.length === 0) {
		Swal.fire({
			icon: 'info',
			title: 'Please select at least one page to delete.',
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
    	return;
  }

  const result = await Swal.fire({
		title: `Are you sure you want to delete ${ids.length} selected page(s)?`,
		text: 'You won\'t be able to revert this!',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#d33',
		cancelButtonColor: '#3085d6',
		confirmButtonText: 'Yes, delete it!',
		cancelButtonText: 'Cancel'
	})

	if (result.isConfirmed) {
		try {
		const res = await fetch(`${baseUrl}/deleteMultiplePages?ids=${ids.join(',')}`, {
			method: "DELETE",
			headers: {
				'Authorization': `${tokenType} ${access_Token}`
			}
		});

    	const data = await res.json();

		if (data.success) {
			Swal.fire({
				icon: 'success',
				title: data.message,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			})
		fetchPage(currentPage)
		countPage()
		document.getElementById('delete-all-btn-page').classList.add('d-none');
		document.querySelectorAll('.row-checkbox:checked').forEach(cb => cb.checked = false);
		const headerCheckbox = document.querySelector('#select-all-page'); // **Assumes your header checkbox has an ID of 'selectAllCheckbox'**
        if (headerCheckbox) {
          headerCheckbox.checked = false;
        }

		} else {
			Swal.fire({
				icon: 'success',
				title: data.error || 'Failed to delete page.',
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			})
		}
  } catch (err) {
	 Swal.fire({
			icon: 'success',
			title: err || 'An error occurred while deleting page.',
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
  }
	}

 
}

async function deleteSelectedUser() {
  const checkboxes = document.querySelectorAll('.row-checkbox:checked');
  const ids = [];

  checkboxes.forEach((checkbox, index) => {
    const row = checkbox.closest('tr');
    const titleCell = row.querySelector('td:nth-child(3)');
    const title = titleCell?.innerText;

    const editBtn = row.querySelector('.dropdown-menu a[onclick^="editUser"]');
    const idMatch = editBtn?.getAttribute('onclick')?.match(/'([^']+)'/);
    if (idMatch) {
      ids.push(idMatch[1]);
    }
  });

  if (ids.length === 0) {
		Swal.fire({
			icon: 'info',
			title: 'Please select at least one user to delete.',
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
    	return;
  }

  const result = await Swal.fire({
		title: `Are you sure you want to delete ${ids.length} selected user(s)?`,
		text: 'You won\'t be able to revert this!',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#d33',
		cancelButtonColor: '#3085d6',
		confirmButtonText: 'Yes, delete it!',
		cancelButtonText: 'Cancel'
	})

	if (result.isConfirmed) {
		try {
		const res = await fetch(`${baseUrl}/deleteMultipleUsers?ids=${ids.join(',')}`, {
			method: "DELETE",
			headers: {
				'Authorization': `${tokenType} ${access_Token}`
			}
		});

    	const data = await res.json();

		if (data.success) {
			Swal.fire({
				icon: 'success',
				title: data.message,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			})
		fetchActiveUser()
		fetchInActiveUser()
		countUser()
		document.getElementById('delete-all-btn-user').classList.add('d-none');
		document.querySelectorAll('.row-checkbox:checked').forEach(cb => cb.checked = false);
		const headerCheckbox = document.querySelector('#select-all-user'); // **Assumes your header checkbox has an ID of 'selectAllCheckbox'**
        if (headerCheckbox) {
          headerCheckbox.checked = false;
        }

		} else {
			Swal.fire({
				icon: 'success',
				title: data.error || 'Failed to delete user.',
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			})
		}
  } catch (err) {
	 Swal.fire({
			icon: 'success',
			title: err || 'An error occurred while deleting user.',
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
  }
	}

 
}

async function fetchRole(dropdownSelector) {
	
	const res = await fetch(`${baseUrl}/getRole`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	const userRole = data.data

	const dataRoleList = document.querySelector(dropdownSelector)

	dataRoleList.innerHTML = '';

	if (!data.success || !data.data || data.data.length === 0) {
			 const errorRow = `<option disabled selected>${data.error || "No record found"}</option>`;
			  dataRoleList.innerHTML = errorRow
			return ;
	}

  dataRoleList.innerHTML = `<option value="" disabled selected>Select Role</option>`;

	userRole.forEach((item, index) => {
		dataRoleList.innerHTML += `
				<option value="${item.role}">${item.name}</option>
			`
	})
}
