document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const navToggle = document.querySelector('.nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Sliders
    const slideChickens = document.getElementById('slide-chickens');
    const slideFish = document.getElementById('slide-fish');
    const slideEggPrice = document.getElementById('slide-egg-price');
    const slideFishPrice = document.getElementById('slide-fish-price');

    // Slider Value Displays
    const valChickens = document.getElementById('val-chickens');
    const valFish = document.getElementById('val-fish');
    const valEggPrice = document.getElementById('val-egg-price');
    const valFishPrice = document.getElementById('val-fish-price');

    // Calculation Result Displays
    const resInvestment = document.getElementById('res-investment');
    const resRevenue = document.getElementById('res-revenue');
    const resOpex = document.getElementById('res-opex');
    const resProfit = document.getElementById('res-profit');
    const resPayback = document.getElementById('res-payback');
    const resMicroImpact = document.getElementById('res-micro-impact');
    const resReallocFund = document.getElementById('res-realloc-fund');

    // Chart.js instances
    let cashFlowChartInstance = null;
    let capexChartInstance = null;
    let financialChartInstance = null;

    // PDF Download Button Handler
    const navPdfBtn = document.getElementById('nav-download-pdf');
    if (navPdfBtn) {
        navPdfBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.print();
        });
    }

    // 1. Mobile Menu Toggle
    if (navToggle && navLinksContainer) {
        navToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            if (navLinksContainer.classList.contains('active')) {
                navToggle.textContent = 'CLOSE';
            } else {
                navToggle.textContent = 'MENU';
            }
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                navToggle.textContent = 'MENU';
            });
        });
    }

    // 2. Navigation Active Scroll Spy
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - 150)) {
                const sId = section.getAttribute('id');
                if (sId) {
                    current = sId;
                }
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 3. Tab System (Sarana & Prasarana) - Removed since we now use a flat sequential layout

    // 4. Interactive Circular Web Highlights
    const webNodes = document.querySelectorAll('.web-node');
    const webLinks = document.querySelectorAll('.web-link');
    const webCenterCard = document.getElementById('web-center-card');
    if (webNodes.length > 0) {


        // Default detail text
        const defaultCenterHtml = `
            <div class="web-center-default fade-in-content" style="text-align: center; padding: 14px 18px; background: #F8F9FC; border: 1px dashed #1A3A6B; border-radius: 4px;">
                <h4 style="font-family: 'Times New Roman', Times, serif; font-size: 1.08rem; color: #1A3A6B; font-weight: bold; margin-bottom: 4px;">Pusat Jaring Sirkular &amp; Detail Hubungan Interaktif</h4>
                <p style="font-size: 0.88rem; color: var(--color-ink-muted); margin: 0; line-height: 1.4;">Arahkan kursor ke salah satu dari 11 kartu di sekeliling papan untuk melihat jaring hubungan timbal balik dan alur transfer nutrisi secara interaktif.</p>
            </div>
        `;

        if (webCenterCard) {
            webCenterCard.innerHTML = defaultCenterHtml;
        }

        // Node descriptions containing relationships
        const nodeDescriptions = {
            'node-energy': {
                title: 'Air & Energi Mandiri',
                desc: 'Pembangkit listrik terbarukan (PLTMH & PLTS) 10 kWp penyedia daya gratis guna memotong opex energi kawasan.',
                gives: [
                    '<strong>Sentra Ayam:</strong> Listrik operasional kandang & mesin giling pakan gratis.',
                    '<strong>Perikanan Nila:</strong> Energi listrik gratis pompa aerator menaikkan margin profit nila.',
                    '<strong>Dapur Kuliner:</strong> Pasokan daya lemari pendingin cold storage komersial.',
                    '<strong>Alga & Azolla:</strong> Daya aerasi & sirkulasi kolam alga/Azolla bebas tagihan PLN.'
                ],
                receives: [
                    '<strong>Air Sungai Alami:</strong> Aliran gravitasi sungai memutar turbin generator listrik PLTMH.'
                ]
            },
            'node-chickens': {
                title: 'Sentra Ayam Petelur',
                desc: 'Unit usaha produksi telur komersial kapasitas 30.000 ekor sebagai penghasil omzet utama kawasan.',
                gives: [
                    '<strong>Instalasi Dekomposisi:</strong> Bahan baku pupuk organik bernilai jual komersial.',
                    '<strong>Dapur Kuliner:</strong> Bahan baku telur segar premium untuk disajikan ke pengunjung resto.'
                ],
                receives: [
                    '<strong>Budidaya Jagung:</strong> Pakan jagung giling mandiri memotong opex pakan pabrik komersial.',
                    '<strong>BSF Maggot:</strong> Tepung maggot kaya protein menghemat opex pakan komersial ayam petelur.',
                    '<strong>Energi Mandiri:</strong> Suplai listrik gratis memangkas opex penerangan kandang.',
                    '<strong>Alga & Azolla:</strong> Azolla segar mensubstitusi 15-20% pakan & alga menghasilkan telur premium omega-3.',
                    '<strong>Koperasi & Bank Pakan:</strong> Pakan konsentrat bersubsidi penekan biaya pakan ayam peternak.'
                ]
            },
            'node-deko': {
                title: 'Instalasi Dekomposisi',
                desc: 'Fasilitas pengolahan kotoran ayam segar menjadi bahan baku setengah jadi bernilai ekonomis tinggi.',
                gives: [
                    '<strong>Sentra Pupuk:</strong> Menyuplai bahan baku kering siap olah untuk produk pupuk granul bernilai komersial.',
                    '<strong>Perikanan Nila:</strong> Cairan kaya nitrogen menyuburkan fitoplankton kolam, memotong biaya pakan pelet nila 15%.',
                    '<strong>Alga & Azolla:</strong> Pupuk organik cair sebagai media nutrisi kultur alga & kolam Azolla yang murah.'
                ],
                receives: [
                    '<strong>Sentra Ayam:</strong> Bahan baku kotoran segar ayam harian tanpa biaya akuisisi.'
                ]
            },
            'node-pupuk': {
                title: 'Sentra Pupuk Organik',
                desc: 'Pabrik pemrosesan pupuk granul komersial berkapasitas tinggi untuk segmen pasar pupuk umum.',
                gives: [
                    '<strong>Budidaya Jagung:</strong> Pupuk granul gratis menyuburkan tanah dan menghemat biaya pupuk jagung 100%.',
                    '<strong>Koperasi & Bank Pakan:</strong> Alokasi pupuk granul bersubsidi menambah keuntungan dagang koperasi.'
                ],
                receives: [
                    '<strong>Instalasi Dekomposisi:</strong> Bahan baku kotoran terurai kering siap olah.',
                    '<strong>Perikanan Nila:</strong> Endapan lumpur kolam kaya fosfor sebagai pengaya kualitas pupuk.',
                    '<strong>Budidaya Jamur:</strong> Residu baglog lapuk bernilai nutrisi tinggi sebagai campuran pupuk granul premium.'
                ]
            },
            'node-jagung': {
                title: 'Budidaya Jagung Pipil',
                desc: 'Lahan budidaya jagung pipil mandiri sebagai penyedia bahan baku pakan ayam penekan opex.',
                gives: [
                    '<strong>Sentra Ayam:</strong> Jagung pipil giling memangkas opex pembelian pakan pabrik komersial.',
                    '<strong>Dapur Kuliner:</strong> Komoditas jagung manis segar bernilai jual tinggi untuk resto wisata.',
                    '<strong>Budidaya Jamur:</strong> Sisa jerami kering sebagai media baglog jamur gratis menekan opex produksi.'
                ],
                receives: [
                    '<strong>Sentra Pupuk:</strong> Pupuk organik granul berkualitas mengeliminasi biaya pembelian pupuk kimia.',
                    '<strong>Perikanan Nila:</strong> Air kolam kaya nitrogen menyuburkan tanah jagung tanpa biaya tambahan.',
                    '<strong>Koperasi & Bank Pakan:</strong> Distribusi bibit unggul murah & kemitraan penjualan jagung harga adil.'
                ]
            },
            'node-nila': {
                title: 'Perikanan Nila',
                desc: 'Unit usaha perikanan nila komersial dengan pakan sirkular berdaya saing pasar tinggi.',
                gives: [
                    '<strong>Sentra Pupuk:</strong> Lumpur sedimen kaya fosfor untuk bahan pengaya pupuk granul premium.',
                    '<strong>Dapur Kuliner:</strong> Pasokan ikan nila hidup segar untuk menu kuliner bernilai jual tinggi.',
                    '<strong>Budidaya Jagung:</strong> Air siraman kaya unsur hara untuk menyuburkan kebun jagung.'
                ],
                receives: [
                    '<strong>Instalasi Dekomposisi:</strong> Plankton subur hasil dekomposisi menghemat opex pakan pelet nila.',
                    '<strong>BSF Maggot:</strong> Maggot hidup pakan protein tinggi gratis memotong opex pelet nila harian.',
                    '<strong>Energi Mandiri:</strong> Daya listrik gratis pompa sirkulasi mengamankan tingkat kelangsungan hidup nila.',
                    '<strong>Alga & Azolla:</strong> Azolla segar mensubstitusi 30% pellet & alga mempercepat bobot nila siap panen.',
                    '<strong>Koperasi & Bank Pakan:</strong> Pakan murah bersubsidi menekan opex pembudidayaan nila warga.'
                ]
            },
            'node-dapur': {
                title: 'Dapur Kuliner & Wisata',
                desc: 'Resto & Eduwisata Farm-to-Table beromzet harian tinggi yang menyerap seluruh komoditas kawasan.',
                gives: [
                    '<strong>BSF Maggot:</strong> Sisa bahan makanan bergizi sebagai pakan gratis pembesaran larva Maggot BSF.'
                ],
                receives: [
                    '<strong>Sentra Ayam:</strong> Telur segar premium berkualitas tinggi langsung dari kandang.',
                    '<strong>Perikanan Nila:</strong> Ikan nila segar untuk olahan kuliner bernilai jual tinggi.',
                    '<strong>Budidaya Jagung:</strong> Jagung manis segar untuk hidangan resto bakar & rebus.',
                    '<strong>Energi Mandiri:</strong> Suplai listrik gratis menjamin keawetan stok di cold storage.',
                    '<strong>Alga & Azolla:</strong> Biomassa alga bernilai jual tinggi untuk produk jus/minuman kesehatan di resto.',
                    '<strong>Budidaya Jamur:</strong> Pasokan jamur tiram segar untuk hidangan jamur krispi & sate jamur resto.'
                ]
            },
            'node-maggot': {
                title: 'BSF Maggot & Daur Ulang',
                desc: 'Unit produksi protein hewani alternatif (maggot) sebagai pensubstitusi tepung ikan komersial.',
                gives: [
                    '<strong>Sentra Ayam:</strong> Tepung maggot menekan opex konsentrat pakan ayam pabrikan hingga 20%.',
                    '<strong>Perikanan Nila:</strong> Maggot hidup gratis menghemat pengeluaran pelet nila harian.',
                    '<strong>Koperasi & Bank Pakan:</strong> Bahan baku konsentrat protein murah pakan koperasi warga.'
                ],
                receives: [
                    '<strong>Dapur Kuliner:</strong> Residu makanan sisa dapur resto sebagai media pakan pembesaran maggot gratis.'
                ]
            },
            'node-jamur': {
                title: 'Budidaya Jamur Tiram',
                desc: 'Unit usaha komersial jamur tiram putih organik berdaya serap tinggi di pasar pasar lokal.',
                gives: [
                    '<strong>Dapur Kuliner:</strong> Menyuplai jamur segar bernilai jual tinggi di menu resto wisata.',
                    '<strong>Sentra Pupuk:</strong> Residu baglog lapuk sebagai bahan pengaya kompos premium bernilai komersial.'
                ],
                receives: [
                    '<strong>Budidaya Jagung:</strong> Limbah jerami & batang jagung gratis sebagai bahan dasar pengisi baglog.'
                ]
            },
            'node-spirulina': {
                title: 'Alga & Azolla',
                desc: 'Sentra budidaya mikroalga (Spirulina & Chlorella) & makroalga Azolla pinnata sebagai protein pakan mandiri.',
                gives: [
                    '<strong>Perikanan Nila:</strong> Pakan alga & Azolla segar menekan opex pellet hingga 30%.',
                    '<strong>Sentra Ayam:</strong> Campuran Azolla pakan murah (subsidi 15% ransum) & alga aditif telur premium.',
                    '<strong>Dapur Kuliner:</strong> Jus sehat alga & produk olahan herbal bernilai jual tinggi.',
                    '<strong>Koperasi & Bank Pakan:</strong> Suplai biomassa alga & Azolla kering untuk bahan campuran konsentrat pakan.'
                ],
                receives: [
                    '<strong>Instalasi Dekomposisi:</strong> Pupuk organik cair sebagai nutrisi media kultur raceway & kolam Azolla.',
                    '<strong>Energi Mandiri:</strong> Daya listrik PLTS/PLTMH gratis untuk operasional pengaduk paddle wheel alga.'
                ]
            },
            'node-koperasi': {
                title: 'Koperasi & Bank Pakan',
                desc: 'Unit bisnis kemitraan desa penyedia pakan murah & offtaker penjamin stabilitas pasar.',
                gives: [
                    '<strong>Sentra Ayam:</strong> Menyalurkan pakan konsentrat protein bersubsidi menekan opex peternak warga.',
                    '<strong>Perikanan Nila:</strong> Menyalurkan konsentrat murah penurun opex kolam nila warga.',
                    '<strong>Budidaya Jagung:</strong> Kemitraan penyedia bibit unggul & offtaker penjamin harga beli panen jagung warga.'
                ],
                receives: [
                    '<strong>Sentra Pupuk:</strong> Menerima produk pupuk granul bersubsidi untuk disalurkan ke anggota tani.',
                    '<strong>Budidaya Jagung:</strong> Menyerap jagung pipil panen dari petani mitra desa sebagai bahan baku.',
                    '<strong>BSF Maggot:</strong> Tepung maggot protein pakan untuk campuran pakan murah koperasi.',
                    '<strong>Alga & Azolla:</strong> Tepung alga & Azolla kering sebagai bahan campuran bernutrisi tinggi pakan koperasi.'
                ]
            }
        };

        let hoveredNodeId = null;

        webNodes.forEach(node => {
            node.addEventListener('mouseenter', () => {
                const nodeId = node.id;
                hoveredNodeId = nodeId;
                const data = nodeDescriptions[nodeId];
                if (!data) return;

                const circularBoard = document.querySelector('.circular-web-board');
                if (circularBoard) circularBoard.classList.add('board-active-hover');

                // 1. Highlight Node
                node.classList.add('active-node');

                const name = nodeId.replace('node-', '');

                // 2. Highlight SVG Links (Paths) and identify inputs/outputs
                const inputs = new Set();
                const outputs = new Set();

                webLinks.forEach(link => {
                    if (link.classList.contains(`link-${name}`)) {
                        link.classList.add('highlighted-link');
                        if (link.classList.contains(`to-${name}`)) {
                            link.classList.add('highlighted-input');
                            link.classList.forEach(cls => {
                                if (cls.startsWith('from-') && cls !== `from-${name}`) {
                                    inputs.add(cls.replace('from-', ''));
                                }
                            });
                        } else if (link.classList.contains(`from-${name}`)) {
                            link.classList.add('highlighted-output');
                            link.classList.forEach(cls => {
                                if (cls.startsWith('to-') && cls !== `to-${name}`) {
                                    outputs.add(cls.replace('to-', ''));
                                }
                            });
                        }
                    } else {
                        link.classList.add('faded-link');
                    }
                });

                // 3. Highlight Connected Nodes
                webNodes.forEach(otherNode => {
                    if (otherNode !== node) {
                        const otherName = otherNode.id.replace('node-', '');
                        if (inputs.has(otherName)) {
                            otherNode.classList.add('connected-node-input');
                        } else if (outputs.has(otherName)) {
                            otherNode.classList.add('connected-node-output');
                        } else {
                            otherNode.classList.add('faded-node');
                        }
                    }
                });

                // 4. Update Center Card with Rich Detail
                if (webCenterCard) {
                    let givesHtml = data.gives.map(item => `<li>${item}</li>`).join('');
                    let receivesHtml = data.receives.map(item => `<li>${item}</li>`).join('');

                    webCenterCard.innerHTML = `
                        <div class="web-center-detail fade-in-content">
                            <h4>${data.title}</h4>
                            <p class="center-node-desc">${data.desc}</p>

                            <div class="center-relations-grid">
                                <div class="relation-column">
                                    <h5 class="rel-title gives">MEMBERI MANFAAT KE:</h5>
                                    <ul>${givesHtml}</ul>
                                </div>
                                <div class="relation-column">
                                    <h5 class="rel-title receives">MENERIMA DARI:</h5>
                                    <ul>${receivesHtml}</ul>
                                </div>
                            </div>
                        </div>
                    `;
                }
            });

            node.addEventListener('mouseleave', () => {
                hoveredNodeId = null;
                const circularBoard = document.querySelector('.circular-web-board');
                if (circularBoard) circularBoard.classList.remove('board-active-hover');

                // 1. Remove Node Highlights
                node.classList.remove('active-node');

                // 2. Reset SVG Links
                webLinks.forEach(link => {
                    link.classList.remove('highlighted-link');
                    link.classList.remove('highlighted-input');
                    link.classList.remove('highlighted-output');
                    link.classList.remove('faded-link');
                });

                // 3. Reset Nodes
                webNodes.forEach(otherNode => {
                    if (otherNode !== node) {
                        otherNode.classList.remove('connected-node-input');
                        otherNode.classList.remove('connected-node-output');
                        otherNode.classList.remove('faded-node');
                    }
                });

                // 4. Reset Center Card
                if (webCenterCard) {
                    webCenterCard.innerHTML = defaultCenterHtml;
                }
            });
        });

        // Space Constellation Physics Engine
        const baseCenters = {
            'node-chickens':  { cx: 450, cy: 75 },
            'node-jamur':     { cx: 650, cy: 110 },
            'node-dapur':     { cx: 786, cy: 206 },
            'node-nila':      { cx: 816, cy: 332 },
            'node-maggot':    { cx: 730, cy: 447 },
            'node-spirulina': { cx: 554, cy: 516 },
            'node-deko':      { cx: 346, cy: 516 },
            'node-koperasi':  { cx: 170, cy: 447 },
            'node-pupuk':     { cx: 84,  cy: 332 },
            'node-jagung':    { cx: 114, cy: 206 },
            'node-energy':    { cx: 250, cy: 110 }
        };

        const simulatedNodes = [];
        webNodes.forEach((node, index) => {
            const id = node.id;
            const base = baseCenters[id] || { cx: 450, cy: 300 };
            simulatedNodes.push({
                id: id,
                el: node,
                x: base.cx,
                y: base.cy,
                baseX: base.cx,
                baseY: base.cy,
                vx: 0,
                vy: 0,
                index: index
            });
        });

        const linksData = [];
        webLinks.forEach(link => {
            let fromNodeName = '';
            let toNodeName = '';
            link.classList.forEach(cls => {
                if (cls.startsWith('from-')) fromNodeName = 'node-' + cls.replace('from-', '');
                if (cls.startsWith('to-')) toNodeName = 'node-' + cls.replace('to-', '');
            });

            const fromNodeObj = simulatedNodes.find(n => n.id === fromNodeName);
            const toNodeObj = simulatedNodes.find(n => n.id === toNodeName);

            if (fromNodeObj && toNodeObj) {
                linksData.push({
                    el: link,
                    from: fromNodeObj,
                    to: toNodeObj
                });
            }
        });

        function getIntersection(node, dx, dy) {
            const halfW = 70; // 140 / 2
            const halfH = 26; // 52 / 2
            if (dx === 0 && dy === 0) return { x: node.x, y: node.y };
            const absDx = Math.abs(dx);
            const absDy = Math.abs(dy);
            const tX = halfW / absDx;
            const tY = halfH / absDy;
            const t = Math.min(tX, tY);
            return {
                x: node.x + dx * t,
                y: node.y + dy * t
            };
        }

        function updatePhysics() {
            const isHovered = (hoveredNodeId !== null);
            const time = Date.now() * 0.001;

            simulatedNodes.forEach(node => {
                if (isHovered) {
                    // Snap back to mathematically aligned duodecagon coordinates
                    const ax = (node.baseX - node.x) * 0.12;
                    const ay = (node.baseY - node.y) * 0.12;
                    node.vx = node.vx * 0.3 + ax;
                    node.vy = node.vy * 0.3 + ay;
                } else {
                    // Gentle floating space drift (random wandering)
                    const driftX = Math.sin(time + node.index * 1.7) * 0.08;
                    const driftY = Math.cos(time + node.index * 1.3) * 0.08;
                    node.vx += driftX;
                    node.vy += driftY;

                    // Mild spring pulling them back to their base constellation locations
                    node.vx += (node.baseX - node.x) * 0.005;
                    node.vy += (node.baseY - node.y) * 0.005;
                }

                // Collision Avoidance to prevent overlap
                simulatedNodes.forEach(other => {
                    if (other !== node) {
                        const dx = other.x - node.x;
                        const dy = other.y - node.y;
                        const minDistX = 145; // card width (140) + margin
                        const minDistY = 58;  // card height (52) + margin

                        if (Math.abs(dx) < minDistX && Math.abs(dy) < minDistY) {
                            const overlapX = minDistX - Math.abs(dx);
                            const overlapY = minDistY - Math.abs(dy);

                            const forceX = (dx > 0 ? -1 : 1) * overlapX * 0.04;
                            const forceY = (dy > 0 ? -1 : 1) * overlapY * 0.04;

                            node.vx += forceX;
                            node.vy += forceY;
                        }
                    }
                });

                if (!isHovered) {
                    // Dampen velocities
                    node.vx *= 0.90;
                    node.vy *= 0.90;

                    // Speed limit
                    const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
                    const maxSpeed = 1.2;
                    if (speed > maxSpeed) {
                        node.vx = (node.vx / speed) * maxSpeed;
                        node.vy = (node.vy / speed) * maxSpeed;
                    }
                } else {
                    node.vx *= 0.65;
                    node.vy *= 0.65;
                }

                // Apply velocities
                node.x += node.vx;
                node.y += node.vy;

                // Restrict bounds to canvas edges
                if (node.x < 75) { node.x = 75; node.vx *= -0.5; }
                if (node.x > 825) { node.x = 825; node.vx *= -0.5; }
                if (node.y < 40) { node.y = 40; node.vy *= -0.5; }
                if (node.y > 540) { node.y = 540; node.vy *= -0.5; }

                // Write positions to elements style
                const leftPercent = (node.x - 70) / 900 * 100;
                const topPercent = (node.y - 26) / 600 * 100;
                node.el.style.left = `${leftPercent}%`;
                node.el.style.top = `${topPercent}%`;
            });

            // Redraw SVG connections
            linksData.forEach(link => {
                const dx = link.to.x - link.from.x;
                const dy = link.to.y - link.from.y;
                const start = getIntersection(link.from, dx, dy);
                const end = getIntersection(link.to, -dx, -dy);

                const ctrlX = (start.x + end.x) / 2 + dy * 0.06;
                const ctrlY = (start.y + end.y) / 2 - dx * 0.06;

                link.el.setAttribute('d', `M ${start.x} ${start.y} Q ${ctrlX} ${ctrlY} ${end.x} ${end.y}`);
            });

            requestAnimationFrame(updatePhysics);
        }

        requestAnimationFrame(updatePhysics);
    }


    // Helper: Format Rupiah
    function formatRupiah(number) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(number);
    }

    // 5. Simulator Calculations (Financial Planning Engine)
    function updateCalculations() {
        const chickens = parseInt(slideChickens.value);
        const fish = parseInt(slideFish.value);
        const eggPrice = parseInt(slideEggPrice.value);
        const fishPrice = parseInt(slideFishPrice.value);

        // Update Slider value displays
        valChickens.textContent = chickens.toLocaleString('id-ID') + " Ekor";
        valFish.textContent = fish.toLocaleString('id-ID') + " Ekor";
        valEggPrice.textContent = formatRupiah(eggPrice);
        valFishPrice.textContent = formatRupiah(fishPrice);

        // ======================================
        // A. CAPEX (Capital Expenditure)
        // ======================================
        // 1. Sentra Ayam: DOC 40K/ekor + Kandang + Conveyor + Silo + Gudang + Sortasi + Blower + Genset (Total: Rp 4.200.000.000)
        const capexDOC = chickens * 40000;
        const unitsAyam = chickens / 5000; // 6 unit kandang
        const capexKandang = Math.round(unitsAyam * 250000000); // 1.500.000.000
        const capexConveyor = Math.round(unitsAyam * 75000000); // 450.000.000
        const capexSiloGudang = 350000000;
        const capexSortasiMess = 170000000;
        const capexBlowerCooling = Math.round(unitsAyam * 46666667); // 280.000.000
        const capexGenset = 250000000;
        const capexAyam = capexDOC + capexKandang + capexConveyor + capexSiloGudang + capexSortasiMess + capexBlowerCooling + capexGenset;

        // 2. Perikanan Nila: Bibit + Kolam D5 + Aerator + RAS + Mesin Pelet + Bak Transit (Total: Rp 750.000.000)
        const capexBibitNila = fish * 350;
        const jumlahKolam = Math.ceil(fish / 4687.5); // 16 unit kolam
        const capexKolam = jumlahKolam * 10000000; // 160.000.000
        const capexAerator = Math.round(jumlahKolam * 5312500); // 85.000.000
        const capexRAS = 220000000;
        const capexPeletMesin = 120000000;
        const capexPanenFiber = 112500000;
        const capexNila = capexBibitNila + capexKolam + capexAerator + capexRAS + capexPeletMesin + capexPanenFiber;

        // 3-12. Sektor Sumpat & Infrastruktur Kawasan
        const capexPupuk = 450000000;
        const capexJagung = 250000000;
        const capexMaggot = 250000000;
        const capexSpirulina = 300000000;
        const capexJamur = 250000000;
        const capexKuliner = 450000000;
        const capexKoperasi = 350000000;
        const capexEnergi = 850000000;
        const capexDeko = 200000000;
        const capexInfra = 1950000000; // Termasuk Pusat R&D Kayu 2 Lt (1.25M) + Akses Paving K-400 (400M) + IT On-Premise (300M)

        const totalCapex = capexAyam + capexNila + capexPupuk + capexJagung + capexMaggot +
                           capexSpirulina + capexJamur + capexKuliner + capexKoperasi +
                           capexEnergi + capexDeko + capexInfra;

        // ======================================
        // B. REVENUE (Pendapatan Tahunan)
        // ======================================
        // 1. Telur: (chickens × 95% survival) × 90% HDP × 365 ÷ 17 butir/kg × eggPrice
        const productiveChickens = chickens * 0.95;
        const eggProductionKgYear = (productiveChickens * 0.90 * 365) / 17;
        const revEggs = eggProductionKgYear * eggPrice;

        // 2. Ikan Nila: fish × 85% SR × 0.3 kg × 2 siklus × fishPrice
        const fishProductionKgYear = fish * 0.85 * 0.3 * 2;
        const revFish = fishProductionKgYear * fishPrice;

        // 3. Pupuk Organik: 100 ton/thn × Rp 5.000/kg
        const revPupuk = 100000 * 5000;

        // 4. Tepung Maggot: 6 ton/thn × Rp 15.000/kg
        const revMaggot = 6000 * 15000;

        // 5. Spirulina Biomassa: 1.200 kg/thn × Rp 150.000/kg
        const revSpirulina = 1200 * 150000;

        // 6. Jamur Tiram: 12 ton/thn × Rp 20.000/kg
        const revJamur = 12000 * 20000;

        // 7. Dapur Kuliner: Rp 1.500.000/hari × 300 hari
        const revKuliner = 1500000 * 300;

        // 8. Eduwisata: 6.000 pengunjung × Rp 25.000
        const revEduwisata = 6000 * 25000;

        const totalRevenue = revEggs + revFish + revPupuk + revMaggot +
                             revSpirulina + revJamur + revKuliner + revEduwisata;

        // ======================================
        // C. OPEX (Biaya Operasional Tahunan)
        // ======================================
        // 1. Pakan Ayam: productiveChickens × 110g/hari × Rp 7.000/kg × 365
        const opexPakanAyam = productiveChickens * 0.110 * 7000 * 365;

        // 2. Vaksin & Obat: chickens × Rp 4.000/ekor/tahun
        const opexVaksin = chickens * 4000;

        // 3. Pakan Nila: fish × Rp 667/ekor/siklus × 2 siklus (50% subsidi sirkular)
        const opexPakanNila = fish * 667 * 2;

        // 4. Obat Nila: jumlahKolam × Rp 1.250.000/tahun
        const opexObatNila = jumlahKolam * 1250000;

        // 5. Bahan Baglog Jamur
        const opexBaglog = 15000000;

        // 6. Bahan Baku Kuliner
        const opexKuliner = 120000000;

        // 7. Gaji TK Lokal: 30 orang × Rp 2.500.000 × 12
        const opexGaji = 900000000;

        // 8. Transportasi & Distribusi
        const opexTransport = 120000000;

        // 9. Maintenance & Penyusutan
        const opexMaintenance = 100000000;

        // 10. Administrasi & Lain-lain
        const opexAdmin = 50000000;

        const totalOpex = opexPakanAyam + opexVaksin + opexPakanNila + opexObatNila +
                          opexBaglog + opexKuliner + opexGaji + opexTransport +
                          opexMaintenance + opexAdmin;

        // ======================================
        // D. P&L ANALYSIS
        // ======================================
        const netProfit = totalRevenue - totalOpex;
        const paybackPeriod = netProfit > 0 ? (totalCapex / netProfit).toFixed(1) : '∞';

        // E. Dampak Ekonomi Mikro & Reinvestasi Sosial
        const reallocFund = netProfit > 0 ? netProfit : 0;

        // 1. Penyerapan Gaji Tenaga Kerja Lokal
        const gajiLokal = opexGaji;
        // 2. Penghematan Pupuk Subsidi (30% total pupuk dijual Rp 1.500/kg vs pasar Rp 5.000/kg)
        const pupukSubsidi = 100000 * 0.3 * (5000 - 1500);
        // 3. Margin Jagung Petani Mitra
        const panenJagungMitra = (chickens * 0.11 * 365 * 0.5) * 1500;
        // 4. Perputaran Ekonomi Wisata Desa
        const pariwisataEkonomi = 6000 * 40000;

        const totalMicroImpact = gajiLokal + pupukSubsidi + panenJagungMitra + pariwisataEkonomi;

        // Update DOM
        resInvestment.textContent = formatRupiah(totalCapex);
        resRevenue.textContent = formatRupiah(totalRevenue);
        resOpex.textContent = formatRupiah(totalOpex);
        resProfit.textContent = formatRupiah(netProfit);
        resPayback.textContent = netProfit > 0 ? `${paybackPeriod} Tahun` : 'Tidak tercapai (Rugi)';

        if (resMicroImpact) resMicroImpact.textContent = formatRupiah(totalMicroImpact);
        if (resReallocFund) resReallocFund.textContent = formatRupiah(reallocFund);

        // Update dynamic charts
        updateCharts(totalCapex, netProfit, capexAyam, capexNila);
    }

    // Helper: Update dynamic financial charts
    function updateCharts(totalCapex, netProfit, capexAyam, capexNila) {
        const capexEnergi = 850000000;
        const capexPupuk = 450000000;
        const capexMaggotSpirulina = 250000000 + 300000000;
        const capexOther = 250000000 + 250000000 + 450000000 + 350000000 + 200000000 + 1950000000;

        // 5-year cumulative cash flow projection
        const cashFlowData = [
            -totalCapex,
            -totalCapex + netProfit,
            -totalCapex + netProfit * 2,
            -totalCapex + netProfit * 3,
            -totalCapex + netProfit * 4,
            -totalCapex + netProfit * 5
        ];

        // 1. Line Chart: Cumulative Cash Flow
        const ctxFlow = document.getElementById('cashFlowChart');
        if (ctxFlow) {
            if (cashFlowChartInstance) {
                cashFlowChartInstance.data.datasets[0].data = cashFlowData;
                if (netProfit <= 0) {
                    cashFlowChartInstance.data.datasets[0].borderColor = '#D32F2F';
                    cashFlowChartInstance.data.datasets[0].backgroundColor = 'rgba(211, 47, 47, 0.05)';
                } else {
                    cashFlowChartInstance.data.datasets[0].borderColor = '#1A3A6B';
                    cashFlowChartInstance.data.datasets[0].backgroundColor = 'rgba(26, 58, 107, 0.05)';
                }
                cashFlowChartInstance.update();
            } else {
                cashFlowChartInstance = new Chart(ctxFlow, {
                    type: 'line',
                    data: {
                        labels: ['Tahun 0', 'Tahun 1', 'Tahun 2', 'Tahun 3', 'Tahun 4', 'Tahun 5'],
                        datasets: [{
                            label: 'Saldo Kas Kumulatif',
                            data: cashFlowData,
                            borderColor: netProfit > 0 ? '#1A3A6B' : '#D32F2F',
                            backgroundColor: netProfit > 0 ? 'rgba(26, 58, 107, 0.05)' : 'rgba(211, 47, 47, 0.05)',
                            borderWidth: 3,
                            fill: true,
                            tension: 0.2,
                            pointRadius: 5,
                            pointHoverRadius: 7,
                            pointBackgroundColor: '#FFF',
                            pointBorderWidth: 2
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { display: false },
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        let val = context.raw;
                                        let prefix = val < 0 ? '-Rp ' : 'Rp ';
                                        return context.dataset.label + ': ' + prefix + Math.abs(val).toLocaleString('id-ID');
                                    }
                                }
                            }
                        },
                        scales: {
                            y: {
                                grid: { color: '#E5E5EE' },
                                ticks: {
                                    font: { family: 'Lora, Georgia, serif', size: 12 },
                                    callback: function(value) {
                                        let isNeg = value < 0;
                                        let absVal = Math.abs(value);
                                        let formatted = '';
                                        if (absVal >= 1000000000) {
                                            formatted = (absVal / 1000000000).toFixed(1) + ' Miliar';
                                        } else if (absVal >= 1000000) {
                                            formatted = (absVal / 1000000).toFixed(0) + ' Juta';
                                        } else {
                                            formatted = absVal.toLocaleString('id-ID');
                                        }
                                        return (isNeg ? '-' : '') + 'Rp ' + formatted;
                                    }
                                }
                            },
                            x: {
                                grid: { display: false },
                                ticks: { font: { family: 'Lora, Georgia, serif', size: 13 } }
                            }
                        }
                    }
                });
            }
        }

        // 2. Doughnut Chart: Capex Composition
        const ctxCapex = document.getElementById('capexChart');
        if (ctxCapex) {
            const capexData = [
                capexAyam,
                capexNila,
                capexEnergi,
                capexPupuk,
                capexMaggotSpirulina,
                capexOther
            ];

            if (capexChartInstance) {
                capexChartInstance.data.datasets[0].data = capexData;
                capexChartInstance.update();
            } else {
                capexChartInstance = new Chart(ctxCapex, {
                    type: 'doughnut',
                    data: {
                        labels: [
                            'Sentra Ayam',
                            'Perikanan Nila',
                            'Energi Mandiri',
                            'Pabrik Pupuk',
                            'Maggot & Spirulina',
                            'Sarana & Infra Lain'
                        ],
                        datasets: [{
                            data: capexData,
                            backgroundColor: [
                                '#1A3A6B',
                                '#4A6FA5',
                                '#2B5288',
                                '#1A3A6B',
                                '#D32F2F',
                                '#78909C'
                            ],
                            borderWidth: 1,
                            hoverOffset: 6
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'bottom',
                                labels: {
                                    font: { family: 'Lora, Georgia, serif', size: 11 },
                                    boxWidth: 10,
                                    padding: 8
                                }
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        let val = context.raw;
                                        let pct = ((val / totalCapex) * 100).toFixed(1);
                                        return context.label + ': Rp ' + val.toLocaleString('id-ID') + ' (' + pct + '%)';
                                    }
                                }
                            }
                        },
                        cutout: '60%'
                    }
                });
            }
        }

        // 3. Pie Chart: Capex Composition (for the calculator section)
        const ctxFinancial = document.getElementById('financialChart');
        if (ctxFinancial) {
            const financialData = [
                capexAyam,
                capexNila,
                capexEnergi,
                capexPupuk,
                capexMaggotSpirulina,
                capexOther
            ];

            if (financialChartInstance) {
                financialChartInstance.data.datasets[0].data = financialData;
                financialChartInstance.update();
            } else {
                financialChartInstance = new Chart(ctxFinancial, {
                    type: 'pie',
                    data: {
                        labels: [
                            'Sentra Ayam',
                            'Perikanan Nila',
                            'Energi Mandiri',
                            'Pabrik Pupuk',
                            'Maggot & Spirulina',
                            'Sarana & Infra Lain'
                        ],
                        datasets: [{
                            data: financialData,
                            backgroundColor: [
                                '#1A3A6B',
                                '#4A6FA5',
                                '#2B5288',
                                '#1A3A6B',
                                '#D32F2F',
                                '#78909C'
                            ],
                            borderWidth: 1,
                            hoverOffset: 6
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'right',
                                labels: {
                                    font: { family: 'Lora, Georgia, serif', size: 11 },
                                    padding: 8
                                }
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        let val = context.raw;
                                        let pct = ((val / totalCapex) * 100).toFixed(1);
                                        return context.label + ': Rp ' + val.toLocaleString('id-ID') + ' (' + pct + '%)';
                                    }
                                }
                            }
                        }
                    }
                });
            }
        }
    }

    // Attach Event Listeners to Sliders
    [slideChickens, slideFish, slideEggPrice, slideFishPrice].forEach(slider => {
        if (slider) {
            slider.addEventListener('input', updateCalculations);
        }
    });

    // Run calculations initially
    updateCalculations();

    // 6. Scroll to Top Button
    const scrollBtn = document.getElementById('scrollToTop');
    if (scrollBtn) {
        const heroSection = document.querySelector('.hero-section');
        const scrollThreshold = heroSection ? heroSection.offsetTop + heroSection.offsetHeight : 600;

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > scrollThreshold) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });

        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 7. Section Reveal on Scroll — Subtle fade-in animation
    const revealSections = document.querySelectorAll('section[id]');

    // Reveal everything at once — used as a safety net / fallback.
    function revealAllSections() {
        revealSections.forEach(s => s.classList.add('revealed'));
    }

    // Progressive fallback: reveal any section that has entered the viewport.
    // Keeps the fade-in effect without depending solely on IntersectionObserver.
    function revealInView() {
        const vh = window.innerHeight || document.documentElement.clientHeight;
        revealSections.forEach(s => {
            if (s.classList.contains('revealed')) return;
            const rect = s.getBoundingClientRect();
            if (rect.top < vh * 0.92 && rect.bottom > 0) {
                s.classList.add('revealed');
            }
        });
    }

    revealSections.forEach(section => section.classList.add('reveal-section'));

    try {
        if ('IntersectionObserver' in window) {
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.08,
                rootMargin: '0px 0px -40px 0px'
            });

            revealSections.forEach(section => revealObserver.observe(section));

            // Also drive reveals from scroll/resize in case the observer is flaky.
            revealInView();
            window.addEventListener('scroll', revealInView, { passive: true });
            window.addEventListener('resize', revealInView);
        } else {
            revealAllSections();
        }
    } catch (e) {
        // If anything above fails, never leave sections invisible.
        revealAllSections();
    }

    // First section is always visible immediately.
    if (revealSections.length > 0) {
        revealSections[0].classList.add('revealed');
    }

    // Ultimate safety net: after a short delay, reveal anything still hidden
    // (handles short pages, backgrounded tabs, or observers that never fire).
    setTimeout(revealAllSections, 2500);

    // 8. Static Report Financial Charts
    const ctxReportCapex = document.getElementById('financialCapexChart');
    if (ctxReportCapex) {
        new Chart(ctxReportCapex, {
            type: 'doughnut',
            data: {
                labels: [
                    'Sentra Ayam',
                    'Perikanan Nila',
                    'Energi Mandiri',
                    'Pabrik Pupuk',
                    'Maggot & Spirulina',
                    'Lain-lain & Infra'
                ],
                datasets: [{
                    data: [4305000000, 455250000, 535000000, 215000000, 250000000, 2530000000],
                    backgroundColor: [
                        '#1A3A6B',
                        '#4A6FA5',
                        '#2B5288',
                        '#1A3A6B',
                        '#D32F2F',
                        '#78909C'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: { family: 'Lora, Georgia, serif', size: 11 },
                            boxWidth: 8,
                            padding: 6
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let val = context.raw;
                                let pct = ((val / 8290250000) * 100).toFixed(1);
                                return context.label + ': Rp ' + val.toLocaleString('id-ID') + ' (' + pct + '%)';
                            }
                        }
                    }
                },
                cutout: '50%'
            }
        });
    }

    const ctxReportProj = document.getElementById('financialProjectionsChart');
    if (ctxReportProj) {
        new Chart(ctxReportProj, {
            type: 'bar',
            data: {
                labels: ['Tahun 1', 'Tahun 2', 'Tahun 3', 'Tahun 4', 'Tahun 5'],
                datasets: [
                    {
                        label: 'Revenue',
                        data: [16462250000, 18108475000, 19919322500, 21911254750, 24102380225],
                        backgroundColor: 'rgba(26, 58, 107, 0.85)',
                        borderColor: '#1A3A6B',
                        borderWidth: 1
                    },
                    {
                        label: 'Opex',
                        data: [9483550000, 9957727500, 10455613875, 10978394569, 11527314297],
                        backgroundColor: 'rgba(139, 94, 26, 0.75)',
                        borderColor: '#1A3A6B',
                        borderWidth: 1
                    },
                    {
                        label: 'Laba Bersih',
                        type: 'line',
                        data: [6978700000, 8150747500, 9463708625, 10932860181, 12575065928],
                        fill: false,
                        borderColor: '#2B5288',
                        backgroundColor: '#2B5288',
                        tension: 0.2,
                        borderWidth: 2,
                        pointRadius: 3
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { font: { family: 'Lora, Georgia, serif', size: 11 } }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': Rp ' + context.raw.toLocaleString('id-ID');
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        grid: { color: '#E5E5EE' },
                        ticks: {
                            font: { family: 'Lora, Georgia, serif', size: 10 },
                            callback: function(value) {
                                let absVal = Math.abs(value);
                                if (absVal >= 1000000000) {
                                    return 'Rp ' + (absVal / 1000000000).toFixed(1) + ' M';
                                } else if (absVal >= 1000000) {
                                    return 'Rp ' + (absVal / 1000000).toFixed(0) + ' Jt';
                                }
                                return 'Rp ' + absVal;
                            }
                        }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { font: { family: 'Lora, Georgia, serif', size: 11 } }
                    }
                }
            }
        });
    }
});