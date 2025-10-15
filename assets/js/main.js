/**
* Template Name: Blogy
* Template URL: https://bootstrapmade.com/blogy-bootstrap-blog-template/
* Updated: Feb 22 2025 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

})();

  document.addEventListener('DOMContentLoaded', function () {
    getRole()
  })


  async function getRole() {
	
	const res = await fetch(`${baseUrl}/getRoles`, {
		method: 'GET'
	})

	const data = await res.json()

	const role = data.data

	const rolelist = document.getElementById('role')

	rolelist.innerHTML = '';

	if (!data.success || !data.data || data.data.length === 0) {
			 const errorRow = `<option disabled selected>${data.error || "No record found"}</option>`;
			  rolelist.innerHTML = errorRow
			return ;
	}

  rolelist.innerHTML = `<option value="" disabled selected>Select Role</option>`;

	role.forEach((item, index) => {
		rolelist.innerHTML += `
				<option value="${item.role}">${item.name}</option>
			`
	})
}


  const secretKey = "0192384756";

  window.addEventListener('DOMContentLoaded', () => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    const rememberedPassword = localStorage.getItem('rememberedPassword');
    const rememberMe = localStorage.getItem('rememberMe') === 'true';

    if (rememberMe && rememberedEmail && rememberedPassword) {
      const decryptedPassword = CryptoJS.AES.decrypt(rememberedPassword, secretKey).toString(CryptoJS.enc.Utf8)
      document.getElementById('email').value = rememberedEmail;
      document.getElementById('password').value = decryptedPassword;
      document.getElementById('rememberMe').checked = true;
    }   
  })

 const accessToken = localStorage.getItem('token')

	if (accessToken) {
		window.location.href = '/Admin_panel.html';
	}


const prefix = 'api/v1'
const baseUrl = `http://localhost:8000/${prefix}`

const tokenType = localStorage.getItem('tokenType')
const access_Token = localStorage.getItem('token')

async function login() {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  const role = document.getElementById('role').value
  const rememberMe = document.getElementById('rememberMe').checked;

  document.getElementById('email-error').textContent = ""
  document.getElementById('password-error').textContent = ""

  let isValid = true;
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

    if (!isValid) {
        return;
    }

  const res = await fetch(`${baseUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password,
      role
    })
  })

  const data = await res.json();

  if (res.ok) {

    const oneDay = 24 * 60 * 60 * 1000;
    const expiryTimestamp = Date.now() + oneDay;
    localStorage.setItem('tokenExpiry', expiryTimestamp);

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', data.user.id);
    localStorage.setItem('email', data.user.email);
    localStorage.setItem('tokenType', data.user.tokenType);
    // localStorage.setItem('tokenExpiry', data.expiresAt);
    localStorage.setItem('role', data.user.role)

    if (rememberMe) {
      const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();
      localStorage.setItem('rememberedEmail', email);
      localStorage.setItem('rememberedPassword', encryptedPassword);
      localStorage.setItem('rememberMe', 'true');
    } else {
      localStorage.removeItem('rememberedEmail');
      localStorage.removeItem('rememberedPassword');
      localStorage.setItem('rememberMe', 'false');
    }

    $('#Modal').modal('hide');

    document.getElementById('email').value = ""
    document.getElementById('password').value = ""

    Swal.fire({
      icon: 'success',
      title: 'Login Successful',
      text: data.message,
      timer: 2000,
      showConfirmButton: false,
      timerProgressBar: true
    }).then(() => {
      // document.getElementById('openModal').style.display = 'none';
      // document.getElementById('userDropdown').style.display = 'inline-block';

      window.location.href = 'Admin_panel.html';

    });

    } else {
       Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: data.error || 'Invalid credentials'
      });
    }
  
}



async function addContact() {
	const name = document.getElementById('contact-name').value
	const email = document.getElementById('contact-email').value
  const contact_no = document.getElementById('contact-phone').value
	const subject = document.getElementById('contact-message').value
	

	
	const res = await fetch(`${baseUrl}/contactUs`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `${tokenType} ${access_Token}`
		},
		body: JSON.stringify({ name,email,contact_no,subject })
	})

	const data = await res.json()

	if (res.ok) {
		Swal.fire({
			icon: 'success',
			title: 'Create ContactUs Successfully',
			text: data.message,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		}).then(() => {
			
			document.getElementById('contact-name').value = ""
			document.getElementById('contact-email').value = ""
      document.getElementById('contact-phone').value = ""
			document.getElementById('contact-message').value = ""
		});
	} else {
		Swal.fire({
			icon: 'error',
			title: `Failed to delete Contact: ${data.error}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}
}

async function googleAuthLogin() {
   const token = localStorage.getItem("token");
    if (token) {
      window.location.href = "/dashboard_real.html";
    }

    const params = new URLSearchParams(window.location.search);
    const newToken = params.get("token");
    if (newToken) {
      localStorage.setItem("token", newToken);
      window.location.href = "/dashboard_real.html";
    }

   window.location.href = 'http://localhost:8000/auth/google'

  
}