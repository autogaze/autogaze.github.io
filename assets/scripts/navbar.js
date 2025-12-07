document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .nav-container {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            width: 100%;
            z-index: 1000;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            background: rgba(255, 255, 255, 0.5);
            transform: translateY(-100%);
            transition: transform 0.3s ease;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .nav-container.visible {
            transform: translateY(0);
        }

        .nav-main {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 30px;
            gap: 20px;
        }

        .nav-left {
            display: flex;
            align-items: center;
            gap: 20px;
            flex: 1;
        }

        .nav-toc-toggle {
            cursor: pointer;
            font-size: 20px;
            color: #000;
            padding: 6px 10px;
            border-radius: 6px;
            transition: background 0.2s ease;
            user-select: none;
        }

        .nav-toc-toggle:hover {
            background: rgba(0, 0, 0, 0.05);
        }

        .nav-title {
            font-family: 'Figtree', sans-serif;
            font-weight: 600;
            font-size: 16px;
            color: #000;
            cursor: pointer;
            white-space: nowrap;
            text-decoration: none;
        }

        .nav-title:hover {
            opacity: 0.7;
        }

        .nav-section {
            font-family: 'Figtree', sans-serif;
            font-size: 14px;
            color: #666;
            font-style: italic;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 300px;
        }

        .nav-right {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .nav-links {
            display: flex;
            gap: 5px;
            align-items: center;
        }

        .nav-links a {
            color: #000;
            text-decoration: none;
            padding: 8px 10px;
            border-radius: 6px;
            transition: background 0.2s ease;
            font-size: 16px;
            display: flex;
            align-items: center;
            gap: 6px;
            font-family: 'Figtree', sans-serif;
            font-weight: 500;
        }

        .nav-links a i {
            font-size: 14px;
        }

        .nav-links a span {
            font-size: 13px;
        }

        .nav-links a:hover {
            background: rgba(0, 0, 0, 0.05);
        }

        .nav-toc-dropdown {
            position: absolute;
            top: 100%;
            left: 30px;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border-radius: 12px;
            padding: 15px;
            margin-top: 5px;
            min-width: 250px;
            max-width: 400px;
            max-height: 70vh;
            overflow-y: auto;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            display: none;
        }

        .nav-toc-dropdown.show {
            display: block;
        }

        .nav-toc-item {
            padding: 10px 12px;
            cursor: pointer;
            color: #666;
            font-family: 'Figtree', sans-serif;
            font-size: 14px;
            border-radius: 6px;
            transition: all 0.2s ease;
        }

        .nav-toc-item:hover {
            background: rgba(0, 0, 0, 0.05);
            color: #000;
        }

        .nav-toc-item.h2 {
            padding-left: 25px;
            font-size: 13px;
        }

        .nav-toc-item.active {
            color: #000;
            font-weight: 500;
            background: rgba(0, 0, 0, 0.05);
        }

        /* Mobile styles */
        @media (max-width: 767px) {
            .nav-main {
                padding: 12px 20px;
            }

            .nav-left {
                gap: 10px;
            }

            .nav-section {
                max-width: 120px;
                font-size: 12px;
            }

            .nav-right {
                gap: 5px;
            }

            .nav-links {
                gap: 3px;
            }

            .nav-links a {
                padding: 6px 8px;
                font-size: 14px;
            }

            .nav-links a span {
                display: none;
            }

            .nav-links a i {
                font-size: 16px;
            }

            .nav-toc-dropdown {
                left: 20px;
                right: auto;
                max-width: none;
            }
        }

        /* Scrollbar styling */
        .nav-toc-dropdown::-webkit-scrollbar {
            width: 6px;
        }

        .nav-toc-dropdown::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.05);
            border-radius: 3px;
        }

        .nav-toc-dropdown::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.2);
            border-radius: 3px;
        }

        .nav-toc-dropdown::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 0, 0, 0.3);
        }
    `;
    document.head.appendChild(style);

    const nav = document.createElement('nav');
    nav.className = 'nav-container';
    nav.innerHTML = `
        <div class="nav-main">
            <div class="nav-left">
                <div class="nav-toc-toggle">☰</div>
                <a href="#" class="nav-title">AutoGaze</a>
                <span class="nav-section"></span>
            </div>
            <div class="nav-right">
                <div class="nav-links">
                    <a href="#"><i class="fa-solid fa-book-open"></i> <span>Paper</span></a>
                    <a href="#"><i class="fa-solid fa-code"></i> <span>Code</span></a>
                    <a href="#"><i class="fa-solid fa-database"></i> <span>HLVid</span></a>
                    <a href="#"><i class="fa-solid fa-laptop-code"></i> <span>Demo</span></a>
                </div>
            </div>
        </div>
        <div class="nav-toc-dropdown"></div>
    `;
    document.body.appendChild(nav);

    // Get elements
    const navTitle = nav.querySelector('.nav-title');
    const navSection = nav.querySelector('.nav-section');
    const tocToggle = nav.querySelector('.nav-toc-toggle');
    const tocDropdown = nav.querySelector('.nav-toc-dropdown');

    // Get all h1 and h2 elements
    const h1Elements = Array.from(document.querySelectorAll('.container.blog.main h1'));
    const h2Elements = Array.from(document.querySelectorAll('.container.blog.main h2'));

    // Helper function to scroll to element with offset for navbar
    function scrollToElement(element) {
        const navbarHeight = 60; // Approximate navbar height
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - navbarHeight;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    // Populate TOC dropdown
    h1Elements.forEach((h1) => {
        const h1Text = h1.textContent.trim();
        if (!h1Text) return; // Skip empty headings

        const h1Item = document.createElement('div');
        h1Item.className = 'nav-toc-item h1';
        h1Item.textContent = h1Text;
        h1Item.addEventListener('click', () => {
            scrollToElement(h1);
            tocDropdown.classList.remove('show');
        });
        tocDropdown.appendChild(h1Item);

        // Find all h2 elements that belong to this h1 section
        const h1Parent = h1.closest('.container.blog.main');
        if (h1Parent) {
            const h2sInSection = Array.from(h1Parent.querySelectorAll('h2'));
            h2sInSection.forEach((h2Element) => {
                const h2Text = h2Element.textContent.trim();
                if (!h2Text) return; // Skip empty headings

                const h2Item = document.createElement('div');
                h2Item.className = 'nav-toc-item h2';
                h2Item.textContent = h2Text;
                h2Item.addEventListener('click', () => {
                    scrollToElement(h2Element);
                    tocDropdown.classList.remove('show');
                });
                tocDropdown.appendChild(h2Item);
            });
        }
    });

    // TOC toggle functionality
    tocToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        tocDropdown.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target)) {
            tocDropdown.classList.remove('show');
        }
    });

    // Title click - scroll to top
    navTitle.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Scroll tracking
    let lastScrollTop = 0;
    let ticking = false;

    function updateNavbar() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollPosition = window.scrollY + 10;

        // Find active section
        let activeH1 = null;
        let activeH2 = null;

        h1Elements.forEach((h1, index) => {
            const currentPos = h1.offsetTop;
            const nextH1 = h1Elements[index + 1];
            const nextPos = nextH1 ? nextH1.offsetTop : document.documentElement.scrollHeight;

            if (scrollPosition >= currentPos && scrollPosition < nextPos) {
                activeH1 = h1;

                // Find active H2 within this H1 section
                let nextElement = h1.nextElementSibling;
                while (nextElement && (nextH1 === null || nextElement !== nextH1)) {
                    if (nextElement.tagName === 'H2') {
                        const h2Pos = nextElement.offsetTop;
                        let nextH2Pos;

                        let tempNext = nextElement.nextElementSibling;
                        while (tempNext && tempNext.tagName !== 'H2' && tempNext !== nextH1) {
                            tempNext = tempNext.nextElementSibling;
                        }

                        if (tempNext && tempNext.tagName === 'H2') {
                            nextH2Pos = tempNext.offsetTop;
                        } else if (nextH1) {
                            nextH2Pos = nextH1.offsetTop;
                        } else {
                            nextH2Pos = document.documentElement.scrollHeight;
                        }

                        if (scrollPosition >= h2Pos && scrollPosition < nextH2Pos) {
                            activeH2 = nextElement;
                        }
                    }
                    nextElement = nextElement.nextElementSibling;
                }
            }
        });

        // Update active states in TOC
        const tocItems = tocDropdown.querySelectorAll('.nav-toc-item');
        tocItems.forEach((item) => {
            if ((item.classList.contains('h1') && activeH1 && activeH1.textContent.trim() === item.textContent) ||
                (item.classList.contains('h2') && activeH2 && activeH2.textContent.trim() === item.textContent)) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Update section display
        if (activeH1) {
            const displayText = activeH2
                ? `${activeH1.textContent.trim()} > ${activeH2.textContent.trim()}`
                : activeH1.textContent.trim();
            navSection.textContent = displayText;
        } else {
            navSection.textContent = '';
        }

        // Show/hide navbar
        const firstH1 = h1Elements[0];
        const firstH1Passed = firstH1 && window.scrollY + 10 >= firstH1.offsetTop;

        if (firstH1Passed) {
            nav.classList.add('visible');
        } else {
            nav.classList.remove('visible');
        }

        lastScrollTop = scrollTop;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateNavbar();
            });
            ticking = true;
        }
    });

    updateNavbar();
});
