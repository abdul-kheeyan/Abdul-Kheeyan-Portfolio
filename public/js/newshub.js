        // Sample news data
        const newsData = [
            {
                id: 1,
                category: 'Technology',
                title: 'AI Revolution Transforms Healthcare Industry',
                description: 'New artificial intelligence systems are revolutionizing patient care and diagnosis accuracy across hospitals worldwide.',
                image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
                author: 'Sarah Johnson',
                date: 'Jan 15, 2026',
                content: 'Artificial intelligence is fundamentally changing how healthcare professionals diagnose and treat patients. Recent advancements in machine learning algorithms have enabled medical professionals to detect diseases earlier and with greater accuracy than ever before. Hospitals around the world are implementing AI-powered diagnostic tools that can analyze medical imaging, predict patient outcomes, and even suggest personalized treatment plans. The technology has shown particular promise in detecting early-stage cancers, cardiovascular diseases, and neurological conditions. However, experts emphasize that AI is meant to augment, not replace, human medical expertise.'
            },
            {
                id: 2,
                category: 'Business',
                title: 'Global Markets Reach New Heights',
                description: 'Stock markets worldwide show strong performance as investor confidence grows amid economic recovery.',
                image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop',
                author: 'Michael Chen',
                date: 'Jan 14, 2026',
                content: 'Global financial markets have reached unprecedented levels as investors show renewed confidence in the economic recovery. Major indices across Asia, Europe, and North America have posted significant gains, driven by strong corporate earnings and positive economic indicators. Technology and renewable energy sectors have led the rally, attracting substantial investment as companies continue to innovate and adapt to changing market demands. Analysts attribute the market strength to a combination of factors including fiscal stimulus measures, vaccination progress, and pent-up consumer demand.'
            },
            {
                id: 3,
                category: 'Sports',
                title: 'Olympic Athletes Break Multiple World Records',
                description: 'Remarkable performances at the international games showcase the pinnacle of human athletic achievement.',
                image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop',
                author: 'Emma Williams',
                date: 'Jan 13, 2026',
                content: 'The latest international sporting event has witnessed an extraordinary display of athletic prowess, with multiple world records falling across various disciplines. Athletes have pushed the boundaries of human performance, demonstrating years of dedication and training. The swimming, track and field, and gymnastics events have been particularly thrilling, with competitors from around the globe showcasing exceptional talent and determination. Sports scientists attribute these achievements to advances in training methodologies, nutrition, and sports technology.'
            },
            {
                id: 4,
                category: 'Health',
                title: 'Breakthrough in Cancer Treatment Shows Promise',
                description: 'New immunotherapy approach demonstrates remarkable success in clinical trials for various cancer types.',
                image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&h=600&fit=crop',
                author: 'Dr. James Mitchell',
                date: 'Jan 12, 2026',
                content: 'Medical researchers have announced a significant breakthrough in cancer treatment, with a new immunotherapy approach showing exceptional results in late-stage clinical trials. The treatment harnesses the body\'s immune system to target and destroy cancer cells more effectively than traditional methods. Patients with previously treatment-resistant cancers have shown remarkable responses, with some experiencing complete remission. The research team emphasizes that while these results are promising, more studies are needed before the treatment becomes widely available.'
            },
            {
                id: 5,
                category: 'Technology',
                title: 'Quantum Computing Reaches New Milestone',
                description: 'Scientists achieve quantum supremacy in solving complex computational problems.',
                image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop',
                author: 'Dr. Lisa Anderson',
                date: 'Jan 11, 2026',
                content: 'A team of quantum physicists has achieved a major milestone in quantum computing, demonstrating the technology\'s ability to solve problems that would take classical computers thousands of years to complete. This advancement brings us closer to practical applications in cryptography, drug discovery, and climate modeling. The breakthrough involves a new approach to managing quantum states and reducing error rates, addressing key challenges that have limited quantum computing progress.'
            },
            {
                id: 6,
                category: 'Business',
                title: 'Sustainable Business Practices Drive Corporate Growth',
                description: 'Companies embracing environmental responsibility see increased profitability and consumer loyalty.',
                image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop',
                author: 'Robert Taylor',
                date: 'Jan 10, 2026',
                content: 'A growing number of corporations are discovering that sustainability and profitability go hand in hand. Companies that have invested in eco-friendly practices, renewable energy, and sustainable supply chains are reporting improved financial performance and stronger customer relationships. Consumer demand for environmentally responsible products continues to rise, creating new market opportunities for businesses willing to adapt their practices.'
            }
        ];

        const categories = ['All', 'Technology', 'Business', 'Sports', 'Health'];
        let currentCategory = 'All';

        // Initialize the website
        function init() {
            renderHomeNews();
            renderCategoryFilters();
            renderCategoryNews(currentCategory);
        }

        // Toggle mobile menu
        function toggleMenu() {
            const navMenu = document.getElementById('navMenu');
            navMenu.classList.toggle('active');
        }

        // Navigation function
        function navigateTo(page, category = null) {
            // Hide all pages
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            
            // Update nav links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.dataset.page === page) {
                    link.classList.add('active');
                }
            });

            // Close mobile menu
            document.getElementById('navMenu').classList.remove('active');

            // Show selected page
            switch(page) {
                case 'home':
                    document.getElementById('homePage').classList.add('active');
                    break;
                case 'category':
                    document.getElementById('categoryPage').classList.add('active');
                    if (category) {
                        currentCategory = category;
                        renderCategoryNews(category);
                        document.getElementById('categoryTitle').textContent = category + ' News';
                    }
                    break;
                case 'article':
                    document.getElementById('articlePage').classList.add('active');
                    if (category) renderArticle(category);
                    break;
                case 'about':
                    document.getElementById('aboutPage').classList.add('active');
                    break;
            }

            window.scrollTo(0, 0);
        }

        // Render news card
        function createNewsCard(article) {
            return `
                <div class="news-card" onclick="navigateTo('article', ${article.id})">
                    <img src="${article.image}" alt="${article.title}" class="news-image">
                    <div class="news-content">
                        <span class="news-category">${article.category}</span>
                        <h3 class="news-title">${article.title}</h3>
                        <p class="news-description">${article.description}</p>
                        <div class="news-meta">
                            <span>${article.author}</span>
                            <span>${article.date}</span>
                        </div>
                    </div>
                </div>
            `;
        }

        // Render home page news
        function renderHomeNews() {
            const grid = document.getElementById('homeNewsGrid');
            grid.innerHTML = newsData.map(article => createNewsCard(article)).join('');
        }

        // Render category filters
        function renderCategoryFilters() {
            const filter = document.getElementById('categoryFilter');
            filter.innerHTML = categories.map(cat => 
                `<button class="filter-btn ${cat === currentCategory ? 'active' : ''}" 
                    onclick="filterByCategory('${cat}')">${cat}</button>`
            ).join('');
        }

        // Filter by category
        function filterByCategory(category) {
            currentCategory = category;
            renderCategoryFilters();
            renderCategoryNews(category);
            // Update hero title
            const title = category === 'All' ? 'All Categories' : category + ' News';
            document.getElementById('categoryTitle').textContent = title;
        }

        // Render category page news
        function renderCategoryNews(category) {
            const grid = document.getElementById('categoryNewsGrid');
            const filtered = category === 'All' 
                ? newsData 
                : newsData.filter(article => article.category === category);
            
            grid.innerHTML = filtered.map(article => createNewsCard(article)).join('');
        }

        // Render article page
        function renderArticle(id) {
            const article = newsData.find(a => a.id === id);
            if (!article) return;

            const content = document.getElementById('articleContent');
            content.innerHTML = `
                <div class="article-header">
                    <span class="article-category">${article.category}</span>
                    <h1 class="article-title">${article.title}</h1>
                    <div class="article-meta">
                        <span>By ${article.author}</span>
                        <span>${article.date}</span>
                    </div>
                </div>
                <img src="${article.image}" alt="${article.title}" class="article-image">
                <div class="article-body">
                    <p>${article.content}</p>
                    <p>${article.description}</p>
                </div>
            `;
        }

        // Initialize on page load
        init();
