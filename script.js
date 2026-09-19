document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the item is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the 'in-view' class to trigger CSS animation
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => {
        observer.observe(item);
    });

    // Modal logic
    const modal = document.getElementById('history-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    const modalHistory = document.getElementById('modal-history');
    const closeBtn = document.querySelector('.close-btn');
    const overlay = document.querySelector('.modal-overlay');

    const historyData = {
        'item-gutenberg': {
            title: 'The Printing Press',
            subtitle: 'Invented by Johannes Gutenberg (1440)',
            text: `<p>Johannes Gutenberg, a German goldsmith, introduced printing to Europe with the printing press. His invention of mechanical movable type printing started the Printing Revolution and is regarded as a milestone of the second millennium.</p>
                   <p>Before the printing press, books were copied by hand, making them rare and expensive. Gutenberg's press used metal alloys to cast durable individual letters, which could be arranged to form words and pages. These pages were inked and pressed onto paper.</p>
                   <p>The Gutenberg Bible, printed in the 1450s, was the first major book printed using mass-produced movable metal type in Europe. This innovation drastically lowered the cost of books, fueled the Renaissance and the Scientific Revolution, and laid the material basis for the modern knowledge-based economy and the spread of learning to the masses.</p>`
        },
        'item-manual': {
            title: 'The Manual Typewriter',
            subtitle: 'Invented by Christopher L. Sholes (1874)',
            text: `<p>The Sholes and Glidden typewriter (also known as the Remington No. 1) was the first commercially successful typewriter. Principally designed by the American inventor Christopher Latham Sholes, it was developed with the assistance of fellow printer Samuel W. Soule and amateur mechanic Carlos Glidden.</p>
                   <p>One of the most enduring legacies of this machine is the QWERTY keyboard layout. Early prototypes had a piano-like keyboard with an alphabetical arrangement. However, the mechanical arms carrying the letters would frequently jam if adjacent letters were struck in rapid succession. The QWERTY layout was designed to separate frequently used letter pairings, thereby reducing jams and allowing for faster overall typing.</p>
                   <p>Manufactured by the sewing machine department of E. Remington and Sons, the machine was initially mounted on a sewing machine stand and featured a foot pedal to return the carriage. It revolutionized office work and played a significant role in bringing women into the clerical workforce.</p>`
        },
        'item-electric': {
            title: 'The Electric Typewriter',
            subtitle: 'Pioneered by Thomas Edison & James Fields Smathers',
            text: `<p>The transition from manual to electric typewriters took several decades. While Thomas Edison patented an electrically operated printing wheel in 1872, it was James Fields Smathers in 1914 who invented what is considered the first practical power-operated office typewriter.</p>
                   <p>Electric typewriters use a motor to provide the power for the typebar strikes, ensuring uniform ink impression on the page regardless of how hard the typist presses the keys. This greatly reduced typist fatigue and increased speed.</p>
                   <p>The pinnacle of electric typewriter design was the IBM Selectric, introduced in 1961. Instead of a moving carriage and individual typebars, the Selectric used a rotating "typeball" (golf ball) that moved across the paper. This design eliminated jams entirely and allowed users to easily change fonts by swapping the typeball. The Selectric dominated the office landscape for over two decades.</p>`
        },
        'item-laser': {
            title: 'The Laser Printer',
            subtitle: 'Invented by Gary Starkweather (1969)',
            text: `<p>The laser printer was invented in 1969 by Gary Starkweather, an engineer working in Xerox's product development department. Starkweather realized that he could use a laser beam to "draw" an image directly onto a copier drum, rather than scanning a physical document.</p>
                   <p>Despite initial resistance from management, Starkweather transferred to the newly formed Xerox PARC (Palo Alto Research Center) where he built the first working prototype, known as "EARS" (Ethernet, Alto Research character generator, Scanned laser output terminal). This technology was eventually commercialized as the Xerox 9700 in 1977, a massive machine designed for high-volume corporate printing.</p>
                   <p>In 1984, Hewlett-Packard revolutionized the market by introducing the HP LaserJet, the first desktop laser printer. Priced at nearly $3,500, it was still a luxury, but it brought quiet, high-resolution (300 dpi), fast printing to individual computer users, completely changing the landscape of desktop publishing.</p>`
        },
        'item-3d': {
            title: 'The 3D Printer',
            subtitle: 'Invented by Chuck Hull (1984)',
            text: `<p>In 1983, Chuck Hull invented stereolithography (SLA), the process of creating 3D objects by curing photosensitive resin layer by layer with an ultraviolet laser. He filed for a patent in 1984 and founded 3D Systems to commercialize the technology.</p>
                   <p>The SLA-1, introduced in 1987, was the world's first commercially available 3D printer. It was initially used primarily for rapid prototyping in the automotive and aerospace industries, allowing engineers to quickly turn digital CAD models into physical parts.</p>
                   <p>This foundational invention sparked the additive manufacturing revolution. Today, 3D printing encompasses various technologies beyond SLA (such as FDM and SLS) and is used in everything from medical implants and custom prosthetics to aerospace components and consumer goods.</p>`
        },
        'item-digital': {
            title: 'The Digital Press',
            subtitle: 'Pioneered by Benny Landa (1993)',
            text: `<p>Unveiled in 1993, the Indigo E-Print 1000 was a landmark invention by Benny Landa that transformed the commercial printing industry. It was the world's first digital color printing press, capable of bypassing the traditional, time-consuming offset plate-making process.</p>
                   <p>The secret to its success was "ElectroInk", a proprietary liquid ink that contained electrically charged particles. The digital press applied this ink to an imaging drum, transferred it to a heated blanket, and then onto the paper, producing offset-quality prints directly from a digital file.</p>
                   <p>This innovation enabled true variable-data printing, where every single printed page could be unique, and made short print runs economically viable. Hewlett-Packard later acquired Indigo in 2001, making HP a dominant force in the modern digital printing revolution.</p>`
        }
    };

    const imageWrappers = document.querySelectorAll('.timeline-item .image-wrapper');
    
    imageWrappers.forEach(wrapper => {
        wrapper.addEventListener('click', function() {
            const section = this.closest('.timeline-item');
            const id = section.id;
            const data = historyData[id];
            const imgSrc = this.querySelector('img').src;
            
            if(data) {
                modalImg.src = imgSrc;
                modalTitle.textContent = data.title;
                modalSubtitle.textContent = data.subtitle;
                modalHistory.innerHTML = data.text;
                modal.classList.add('active');
                
                // Prevent background scrolling
                document.body.style.overflow = 'hidden';
            }
        });
    });

    const closeModal = () => {
        modal.classList.remove('active');
        // Restore background scrolling
        document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
});
