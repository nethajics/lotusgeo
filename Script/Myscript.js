document.addEventListener("DOMContentLoaded", function () {

    /* -- DARK MODE-- */

    const toggle = document.getElementById("darkToggle");

    if (toggle) {
        if (localStorage.getItem("theme") === "dark") {
            document.body.classList.add("dark");
            toggle.checked = true;
        }

        toggle.addEventListener("change", () => {
            if (toggle.checked) {
                document.body.classList.add("dark");
                localStorage.setItem("theme", "dark");
            } else {
                document.body.classList.remove("dark");
                localStorage.setItem("theme", "light");
            }
        });
    }


    /* --- HERO SLIDER -- */

    const hero = document.querySelector(".hero");

    if (hero) {

        const slides = [
    
            {
                image: "images/Banner/PGY.PNG",
                title: "Photogrammetry",
                desc: "High accuracy mapping for :",
                points: [
                    "Aerial Imageries",
                    "Satellite Imageries",
                    "Drone Imageries",
                    "Poinclould Inputs"
                ],
                link: "Services.html#photogrammetry"
              },
               {
                image: "images/Banner/LIDAR.png",
                title: "LiDAR",
                desc: "Acuurate classification for :",
                points: [
                    "Aerial LiDAR",
                    "Mobile LiDAR"
                  
                ],
                link: "Services.html#lidar"
                   },
      {
                image: "images/Banner/BIM.PNG",
                title: "Scan to BIM",
                desc: "Point cloud to BIM 3D Modelling :",
                points: [
                    "Structural",
                    "Architectural",
                    "MEP"
                   
                ],
                link: "Services.html#BIM"
            },
    
                 {
                image: "images/Banner/ORTHO.JPG",
                title: "Orthophoto",
                desc: "Orthophoto processing includes :",
                points: [
                    "Image Alignment",
                    "Orthorectification",
                    "Orthomosaic Creation",
                    "Color Balancing & Seamline Editing"
                ],
                link: "Services.html#ORTHO"
            },
              {
                image: "images/Banner/GIS.PNG",
                title: "GIS",
                desc: "Smart geospatial solutions :",
                points: [
                    "Mapping",
                    "Data updates",
                    "Geo-referencing",
                    "CAD drafting",
                    "Asset management"
                ],
                link: "Services.html#GIS"
               }
         
        ];

        let index = 0;

        const title = document.getElementById("hero-title");
        const desc = document.getElementById("hero-desc");
        const points = document.getElementById("hero-points");
        const btn = document.getElementById("hero-btn");
        const dots = document.getElementById("hero-dots");

        slides.forEach((_, i) => {
            let dot = document.createElement("span");
            dot.addEventListener("click", () => showSlide(i));
            dots.appendChild(dot);
        });

        function showSlide(i) {
            index = i;
            const s = slides[i];

            hero.style.backgroundImage = `url(${s.image})`;

            if (title) title.textContent = s.title;
            if (desc) desc.textContent = s.desc;
            if (btn) btn.href = s.link;

            if (points) {
                points.innerHTML = "";
                s.points.forEach(p => {
                    let li = document.createElement("li");
                    li.textContent = p;
                    points.appendChild(li);
                });
            }

            if (dots) {
                dots.querySelectorAll("span").forEach(d => d.classList.remove("active"));
                if (dots.children[i]) {
                    dots.children[i].classList.add("active");
                }
            }
        }

        function autoSlide() {
            index = (index + 1) % slides.length;
            showSlide(index);
        }

        showSlide(0);
        setInterval(autoSlide, 3000);
    }


    /*---BEFORE / AFTER SLIDERS--- */

    document.querySelectorAll(".compare").forEach(container => {

        const overlay = container.querySelector(".compare-overlay");
        const slider = container.querySelector(".compare-slider");

        if (!overlay || !slider) return;

        // Default center position
        overlay.style.width = "50%";
        slider.style.left = "50%";

        let dragging = false;

        function update(x) {
            const rect = container.getBoundingClientRect();
            let pos = x - rect.left;
            pos = Math.max(0, Math.min(pos, rect.width));

            overlay.style.width = pos + "px";
            slider.style.left = pos + "px";
        }

        // Mouse
        container.addEventListener("mousedown", e => {
            dragging = true;
            update(e.clientX);
        });

        window.addEventListener("mouseup", () => dragging = false);

        window.addEventListener("mousemove", e => {
            if (!dragging) return;
            update(e.clientX);
        });

        // Touch
        container.addEventListener("touchstart", e => {
            dragging = true;
            update(e.touches[0].clientX);
        });

        window.addEventListener("touchend", () => dragging = false);

        window.addEventListener("touchmove", e => {
            if (!dragging) return;
            update(e.touches[0].clientX);
        });

    });

});



  /*-- Contact--- */


function sendMail(event) {
    event.preventDefault();

    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var country = document.getElementById("country").value;
    var company = document.getElementById("company").value;
    var position = document.getElementById("position").value;
    var message = document.getElementById("message").value;

    var subject = "New Inquiry from Website";

    var body =
        "First Name: " + firstName + "%0D%0A" +
        "Last Name: " + lastName + "%0D%0A" +
        "Email: " + email + "%0D%0A" +
        "Phone: " + phone + "%0D%0A" +
        "Country: " + country + "%0D%0A" +
        "Company: " + company + "%0D%0A" +
        "Position: " + position + "%0D%0A%0D%0A" +
        "Message: %0D%0A" + message;

  window.location.href = "mailto:k.pushparaj@lotusgeo.in"
        + "?cc=vinod@lotusgeo.in"
        + "&subject=" + subject
        + "&body=" + body;

}


/*---------Before & After----------*/

document.querySelectorAll(".slider-container").forEach(container => {

    const slider = container.querySelector(".slider");
    const image = container.querySelector(".top-img");

    if (!slider || !image) return;

    const update = (value) => {
        const percent = Math.max(0, Math.min(100, value)); // clamp safety

        const clip = `polygon(0 0, ${percent}% 0, ${percent}% 100%, 0 100%)`;

        image.style.clipPath = clip;
        image.style.webkitClipPath = clip;

        container.style.setProperty('--position', percent + '%');
    };

    // Initial render
    update(slider.value);

    // Smooth update
    slider.addEventListener("input", (e) => {
        requestAnimationFrame(() => {
            update(e.target.value);
        });
    });

});