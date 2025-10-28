const carta = [
    { texto: "Mi querida Enana,", icono: "" },
    { texto: "", icono: "" },
    { texto: "Hoy cumplís 32 años y quería escribirte algo que salga", icono: "fas fa-heart" },
    { texto: "desde lo más profundo de mi corazón.", icono: "" },
    { texto: "", icono: "" },
    { texto: "Sé que durante mucho tiempo te hicieron creer que no valías,", icono: "fas fa-cloud" },
    { texto: "que te desvalorizaron hasta casi convencerte de eso.", icono: "fas fa-arrow-down" },
    { texto: "Pero mirá a tu alrededor ahora, Enana...", icono: "fas fa-eye" },
    { texto: "¿Ves? Hay más amor que destrato, más esperanza que miedo.", icono: "fas fa-balance-scale" },
    { texto: "", icono: "" },
    { texto: "Tu vida no está condenada a ser gris.", icono: "fas fa-palette" },
    { texto: "Podés teñirla de los colores que vos elijas,", icono: "fas fa-brush" },
    { texto: "de esos tonos agradables que merecés experimentar.", icono: "fas fa-star" },
    { texto: "", icono: "" },
    { texto: "Hoy no se trata de nosotros, se trata de VOS.", icono: "fas fa-user" },
    { texto: "De tu increíble capacidad para sobreponerte al dolor,", icono: "fas fa-dove" },
    { texto: "de esa fuerza que tenés adentro aunque a veces la sientas lejana.", icono: "fas fa-dumbbell" },
    { texto: "", icono: "" },
    { texto: "Quiero que te mantengas firme en la esperanza,", icono: "fas fa-anchor" },
    { texto: "que confíes en tus decisiones.", icono: "fas fa-check-circle" },
    { texto: "Que dejes de temer y te animes a VIVIR,", icono: "fas fa-running" },
    { texto: "que no te paralices ante las situaciones sino que las enfrentes.", icono: "fas fa-shield-alt" },
    { texto: "", icono: "" },
    { texto: "Mirá, hay una diferencia enorme entre ser temerario y ser valiente:", icono: "fas fa-brain" },
    { texto: "El temerario es el que no razona los riesgos, actúa sin pensar;", icono: "fas fa-bolt" },
    { texto: "el valiente, en cambio, SÍ tiene miedo pero igual enfrenta.", icono: "fas fa-medal" },
    { texto: "", icono: "" },
    { texto: "Vos batallás con la ansiedad todos los días,", icono: "fas fa-shield-heart" },
    { texto: "y eso no te hace débil ni cobarde...", icono: "fas fa-times-circle" },
    { texto: "¡Todo lo contrario! Te hace VALIENTE.", icono: "fas fa-trophy" },
    { texto: "Porque aunque existen miedos reales, vos los enfrentás", icono: "fas fa-dragon" },
    { texto: "y volvés a intentar, una y otra vez.", icono: "fas fa-redo" },
    { texto: "", icono: "" },
    { texto: "Recordá cuando te insté a que te amaras...", icono: "fas fa-history" },
    { texto: "Eso no era un simple consejo.", icono: "fas fa-lightbulb" },
    { texto: "Todo lo bueno viene de amarse adecuadamente,", icono: "fas fa-seedling" },
    { texto: "en la medida justa para vos y para todos.", icono: "fas fa-balance-scale-right" },
    { texto: "", icono: "" },
    { texto: "En este nuevo año de vida, prometeme que vas a recordar:", icono: "fas fa-birthday-cake" },
    { texto: "Sos mucho más fuerte de lo que creés,", icono: "fas fa-mountain" },
    { texto: "más valiosa de lo que te hicieron pensar,", icono: "fas fa-gem" },
    { texto: "y más amada de lo que podés imaginar.", icono: "fas fa-infinity" },
    { texto: "", icono: "" },
    { texto: "Feliz cumpleaños, Enana.", icono: "fas fa-heart" },
    { texto: "Que este sea el año donde descubrás todo tu poder.", icono: "fas fa-rocket" },
    { texto: "", icono: "" },
    { texto: "Con todo mi amor,", icono: "" },
    { texto: "Andrés", icono: "fas fa-signature" }
];

const { DateTime } = luxon;

// Configuración de fecha objetivo - 29 de Octubre a las 00:00 (hora Argentina)
const FECHA_OBJETIVO = DateTime.fromObject({
    year: 2025,
    month: 10,
    day: 29,
    hour: 0,
    minute: 0,
    second: 0
}, { zone: 'America/Argentina/Buenos_Aires' });

// Sistema principal de inicialización
function inicializarAplicacion() {
    const ahora = DateTime.now().setZone('America/Argentina/Buenos_Aires');
    
    // Verificar si ya pasó la fecha objetivo
    if (ahora >= FECHA_OBJETIVO) {
        // Fecha cumplida - ir directamente al sistema de clave
        inicializarSistemaClave();
    } else {
        // Fecha NO cumplida - mostrar countdown
        inicializarCountdown();
    }
}

// Sistema de countdown (solo se muestra si la fecha NO se cumplió)
function inicializarCountdown() {
    const countdownContainer = document.getElementById('countdownContainer');
    const modalClave = document.getElementById('modalClave');
    
    // Mostrar countdown y ocultar modal de clave
    countdownContainer.style.display = 'flex';
    modalClave.style.display = 'none';
    
    actualizarCountdown();
    
    // Actualizar cada segundo
    const countdownInterval = setInterval(actualizarCountdown, 1000);
    
    function actualizarCountdown() {
        const ahora = new Date();
        const diferencia = FECHA_OBJETIVO - ahora;
        
        if (diferencia <= 0) {
            // ¡Llegó la fecha!
            clearInterval(countdownInterval);
            finalizarCountdown();
            return;
        }
        
        // Calcular días, horas, minutos, segundos
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
        
        // Actualizar display
        document.getElementById('dias').textContent = dias.toString().padStart(2, '0');
        document.getElementById('horas').textContent = horas.toString().padStart(2, '0');
        document.getElementById('minutos').textContent = minutos.toString().padStart(2, '0');
        document.getElementById('segundos').textContent = segundos.toString().padStart(2, '0');
        
        // Efectos especiales cuando faltan pocos segundos
        if (dias === 0 && horas === 0 && minutos < 5) {
            document.querySelectorAll('.countdown-item').forEach(item => {
                item.style.animation = 'pulsoRapido 0.5s infinite';
            });
        }
    }
    
    function finalizarCountdown() {
        const countdownContainer = document.getElementById('countdownContainer');
        const countdownContent = document.querySelector('.countdown-content');
        
        // Efecto de finalización
        countdownContent.classList.add('countdown-terminado');
        
        // Crear efecto de confeti
        crearConfetiFinal();
        
        // Esperar a que termine la animación y mostrar el sistema de clave
        setTimeout(() => {
            countdownContainer.style.display = 'none';
            inicializarSistemaClave();
        }, 1000);
    }
}

// Sistema de clave (solo se muestra si la fecha SE cumplió)
function inicializarSistemaClave() {
    const modal = document.getElementById('modalClave');
    const countdownContainer = document.getElementById('countdownContainer');
    const inputClave = document.getElementById('inputClave');
    const btnValidar = document.getElementById('btnValidar');
    const mensajeError = document.createElement('div');
    
    mensajeError.className = 'mensaje-error';
    document.querySelector('.modal-body').appendChild(mensajeError);

    // Mostrar modal de clave y ocultar countdown
    modal.style.display = 'flex';
    countdownContainer.style.display = 'none';

    // Validar al hacer click
    btnValidar.addEventListener('click', validarClave);

    // Validar al presionar Enter
    inputClave.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            validarClave();
        }
    });

    function validarClave() {
        const input = inputClave.value.trim().toUpperCase();
        
        if (input === '') {
            mostrarError('¡Escribí la palabra clave!');
            return;
        }

        if (input === 'CACHI') {
            // Clave correcta
            inputClave.classList.remove('input-error');
            inputClave.classList.add('input-correcto');
            mensajeError.textContent = '¡Correcto! Descubriendo tu sorpresa...';
            
            setTimeout(() => {
                modal.style.display = 'none';
                // Mostrar control de música
                document.getElementById('controlMusica').style.display = 'flex';
                // Iniciar carta
                escribirCarta();
            }, 1500);
        } else {
            mostrarError('Clave incorrecta. ¡Intentá de nuevo!');
        }
    }

    function mostrarError(mensaje) {
        inputClave.classList.add('input-error');
        inputClave.classList.remove('input-correcto');
        mensajeError.textContent = mensaje;
        
        // Efecto shake
        setTimeout(() => {
            inputClave.classList.remove('input-error');
        }, 500);
    }

    // Focus en el input al cargar
    setTimeout(() => {
        inputClave.focus();
    }, 300);
}

// Sistema de música romántica
function inicializarMusica() {
    const audio = document.getElementById('musicaRomantica');
    const btnMusica = document.getElementById('btnMusica');
    const controlVolumen = document.getElementById('volumen');
    
    if (!audio || !btnMusica || !controlVolumen) return;
    
    // Configurar volumen inicial
    audio.volume = controlVolumen.value / 100;
    
    // Función para manejar el play/pause
    function toggleMusica() {
        if (audio.paused) {
            // Reproducir música
            audio.play().then(() => {
                btnMusica.classList.add('musica-activa');
                btnMusica.innerHTML = '<i class="fas fa-pause"></i><span>Pausar</span>';
            }).catch(error => {
                console.log('Error reproduciendo música:', error);
                // Fallback
                btnMusica.innerHTML = '<i class="fas fa-play"></i><span>Click para activar</span>';
            });
        } else {
            // Pausar música
            audio.pause();
            btnMusica.classList.remove('musica-activa');
            btnMusica.innerHTML = '<i class="fas fa-music"></i><span>Música</span>';
        }
    }
    
    // Control de play/pause
    btnMusica.addEventListener('click', toggleMusica);
    
    // Control de volumen
    controlVolumen.addEventListener('input', function() {
        audio.volume = this.value / 100;
    });
    
    // Intentar reproducir automáticamente
    setTimeout(() => {
        audio.play().then(() => {
            btnMusica.classList.add('musica-activa');
            btnMusica.innerHTML = '<i class="fas fa-pause"></i><span>Pausar</span>';
        }).catch(error => {
            console.log('Autoplay bloqueado');
        });
    }, 1000);
}

function escribirCarta() {
    const contenedor = document.getElementById('carta');
    let indiceLinea = 0;
    let indiceCaracter = 0;
    
    function escribirSiguiente() {
        if (indiceLinea < carta.length) {
            if (indiceCaracter === 0) {
                const linea = document.createElement('div');
                linea.className = 'linea';
                
                const lineaData = carta[indiceLinea];
                
                if (lineaData.icono) {
                    linea.innerHTML = `
                        <div class="linea-con-icono">
                            <i class="${lineaData.icono} icono-linea"></i>
                            <span class="texto-linea"></span>
                        </div>
                    `;
                } else {
                    linea.innerHTML = `<span class="texto-solo"></span>`;
                }
                
                contenedor.appendChild(linea);
            }
            
            const lineaActual = contenedor.lastChild;
            const lineaData = carta[indiceLinea];
            const textoCompleto = lineaData.texto;
            
            if (indiceCaracter < textoCompleto.length) {
                const textoActual = textoCompleto.substring(0, indiceCaracter + 1);
                
                if (lineaData.icono) {
                    const textoElemento = lineaActual.querySelector('.texto-linea');
                    textoElemento.innerHTML = textoActual + '<span class="cursor"></span>';
                } else {
                    lineaActual.querySelector('.texto-solo').innerHTML = textoActual + '<span class="cursor"></span>';
                }
                
                lineaActual.style.opacity = '1';
                indiceCaracter++;
                setTimeout(escribirSiguiente, 60);
            } else {
                if (lineaData.icono) {
                    const textoElemento = lineaActual.querySelector('.texto-linea');
                    textoElemento.innerHTML = textoCompleto;
                } else {
                    lineaActual.querySelector('.texto-solo').innerHTML = textoCompleto;
                }
                
                lineaActual.style.opacity = '1';
                lineaActual.style.transform = 'translateY(0)';
                indiceLinea++;
                indiceCaracter = 0;
                setTimeout(escribirSiguiente, 400);
            }
        } else {
            setTimeout(crearCorazones, 1000);
            setTimeout(crearParticulas, 2000);
            setTimeout(agregarMensajeFinal, 4000);
        }
    }
    
    escribirSiguiente();
}

function crearCorazones() {
    const tiposCorazones = [
        'fas fa-heart', 
        'fas fa-heartbeat', 
        'fas fa-kiss-wink-heart', 
        'fas fa-heart-crack',
        'fas fa-heart-circle-plus',
        'fas fa-heart-circle-check',
        'fas fa-heart-circle-exclamation'
    ];
    
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            const corazon = document.createElement('div');
            corazon.className = 'corazon-flotante';
            
            const tipoCorazon = tiposCorazones[Math.floor(Math.random() * tiposCorazones.length)];
            corazon.innerHTML = `<i class="${tipoCorazon}"></i>`;
            
            corazon.style.left = Math.random() * 100 + 'vw';
            corazon.style.top = '100vh';
            corazon.style.fontSize = (Math.random() * 25 + 20) + 'px';
            corazon.style.color = `hsl(${Math.random() * 360}, 70%, 65%)`;
            corazon.style.animation = `flotar ${Math.random() * 4 + 4}s ease-in-out forwards`;
            corazon.style.animationDelay = Math.random() * 2 + 's';
            
            document.body.appendChild(corazon);
            
            setTimeout(() => {
                if (corazon.parentNode) {
                    corazon.parentNode.removeChild(corazon);
                }
            }, 7000);
        }, i * 150);
    }
}

function crearParticulas() {
    const particulas = [
        'fas fa-star',
        'fas fa-sparkles',
        'fas fa-circle',
        'fas fa-diamond',
        'fas fa-snowflake',
        'fas fa-circle-dot'
    ];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const particula = document.createElement('div');
            particula.className = 'particula';
            
            const tipoParticula = particulas[Math.floor(Math.random() * particulas.length)];
            particula.innerHTML = `<i class="${tipoParticula}"></i>`;
            
            particula.style.left = Math.random() * 100 + 'vw';
            particula.style.top = '100vh';
            particula.style.fontSize = (Math.random() * 15 + 10) + 'px';
            particula.style.color = `hsl(${Math.random() * 360}, 80%, 70%)`;
            particula.style.animation = `flotar-particula ${Math.random() * 3 + 5}s linear forwards`;
            
            document.body.appendChild(particula);
            
            setTimeout(() => {
                if (particula.parentNode) {
                    particula.parentNode.removeChild(particula);
                }
            }, 8000);
        }, i * 200);
    }
}

function agregarMensajeFinal() {
    const mensajeFinal = document.createElement('div');
    mensajeFinal.className = 'mensaje-final';
    mensajeFinal.innerHTML = '<i class="fas fa-heart"></i> Para Siempre <i class="fas fa-heart"></i>';
    
    document.querySelector('.carta-container').appendChild(mensajeFinal);
}

// Efecto de confeti cuando termina el countdown
function crearConfetiFinal() {
    const confetiContainer = document.getElementById('countdownContainer');
    const confetiColors = ['#ff6b6b', '#ff8e8e', '#ffafbd', '#a8e6cf', '#dcedc1', '#ffd3b6'];
    const confetiShapes = ['❀', '✨', '⭐', '💖', '🎀', '🌸'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confeti = document.createElement('div');
            confeti.className = 'confeti';
            confeti.innerHTML = confetiShapes[Math.floor(Math.random() * confetiShapes.length)];
            confeti.style.position = 'absolute';
            confeti.style.left = Math.random() * 100 + 'vw';
            confeti.style.top = '-50px';
            confeti.style.fontSize = (Math.random() * 20 + 15) + 'px';
            confeti.style.color = confetiColors[Math.floor(Math.random() * confetiColors.length)];
            confeti.style.animation = `caerConfeti ${Math.random() * 3 + 2}s linear forwards`;
            confeti.style.zIndex = '2001';
            confeti.style.pointerEvents = 'none';
            
            if (confetiContainer) {
                confetiContainer.appendChild(confeti);
            }
            
            setTimeout(() => {
                if (confeti.parentNode) {
                    confeti.parentNode.removeChild(confeti);
                }
            }, 5000);
        }, i * 100);
    }
}

// Añadir animaciones al CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes pulsoRapido {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    
    @keyframes caerConfeti {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Iniciar cuando la página cargue
window.onload = inicializarAplicacion;