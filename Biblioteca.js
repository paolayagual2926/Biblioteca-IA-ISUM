const PASSWORD_ADMIN = "isum2026"; 

let categoriasData = {
    marketing: {
        titulo: "IA para Mercadotecnia, Publicidad y Ventas",
        badgeTexto: "Mercadotecnia",
        alias: "marketing",
        ias: [
            { nombre: "ChatGPT (Free)", desc: "Ideal para redacción de copys, lluvia de ideas y estrategias publicitarias.", link: "https://chatgpt.com" },
            { nombre: "Copy.ai (Freemium)", desc: "Automatización y creación de contenidos para redes sociales.", link: "https://www.copy.ai" },
            { nombre: "Perplexity AI (Free)", desc: "Buscador inteligente con IA para investigación de mercado rápida.", link: "https://www.perplexity.ai" },
            { nombre: "Hugging Face Chat (Free)", desc: "Acceso libre a diversos modelos de lenguaje abiertos.", link: "https://huggingface.co/chat" },
            { nombre: "Jasper AI (Pago)", desc: "Plataforma avanzada de marketing y redacción corporativa.", link: "https://www.jasper.ai" }
        ]
    },
    administracion: {
        titulo: "IA para Administración y Recursos Humanos",
        badgeTexto: "Administración",
        alias: "administracion",
        ias: [
            { nombre: "Notion AI (Freemium)", desc: "Gestión organizacional y organización de flujos de trabajo.", link: "https://www.notion.so" },
            { nombre: "ClickUp AI (Freemium)", desc: "Planificación y seguimiento inteligente de tareas corporativas.", link: "https://clickup.com" },
            { nombre: "Claude (Free)", desc: "Excelente procesador de textos largos y reportes administrativos.", link: "https://claude.ai" },
            { nombre: "Microsoft Copilot (Free)", desc: "Asistente integrado para hojas de cálculo y ofimática.", link: "https://copilot.microsoft.com" },
            { nombre: "Asana Intelligence (Pago)", desc: "Gestión automatizada de proyectos empresariales complejos.", link: "https://asana.com" }
        ]
    },
    contaduria: {
        titulo: "IA para Contadores y Gestión Fiscal",
        badgeTexto: "Contaduría",
        alias: "contaduria",
        ias: [
            { nombre: "Microsoft Copilot for Finance", desc: "Análisis financiero automatizado y soporte en auditorías.", link: "https://www.microsoft.com" },
            { nombre: "ChatGPT Data Analysis (Free)", desc: "Procesamiento de hojas de Excel y balances contables.", link: "https://chatgpt.com" },
            { nombre: "Google Gemini (Free)", desc: "Consulta rápida de normativas tributarias y resúmenes.", link: "https://gemini.google.com" },
            { nombre: "Claude Spreadsheet (Free)", desc: "Auditoría de datos financieros mediante lenguaje natural.", link: "https://claude.ai" },
            { nombre: "Vic.ai (Pago)", desc: "IA especializada en contabilidad autónoma y cuentas por pagar.", link: "https://vic.ai" }
        ]
    },
    informatica: {
        titulo: "IA para Informática y Sistemas",
        badgeTexto: "Informática",
        alias: "informatica",
        ias: [
            { nombre: "GitHub (Estudiante Gratis)", desc: "Asistente inteligente para desarrollo de software.", link: "https://github.com/" },
            { nombre: "Hugging Face (Free)", desc: "Repositorio líder de modelos de Machine Learning y datasets.", link: "https://huggingface.co" },
            { nombre: "Google Colab (Free)", desc: "Entorno cloud gratuito para programar Python con GPU.", link: "https://colab.research.google.com" },
            { nombre: "DeepSeek (Free)", desc: "Modelo avanzado de razonamiento lógico y código fuente.", link: "https://chat.deepseek.com" },
            { nombre: "Tabnine Pro (Pago)", desc: "Autocompletado de código de nivel empresarial.", link: "https://www.tabnine.com" }
        ]
    },
    docentes: {
        titulo: "IA para Docentes",
        badgeTexto: "Docencia",
        alias: "docentes",
        ias: [
            { nombre: "Gamma App (Freemium)", desc: "Creación rápida de material didáctico y presentaciones.", link: "https://gamma.app" },
            { nombre: "Quizizz AI (Freemium)", desc: "Generación automática de cuestionarios y evaluaciones.", link: "https://quizizz.com" },
            { nombre: "MagicSchool AI (Freemium)", desc: "Plataforma de planificación de clases asistida por IA.", link: "https://www.magicschool.ai" },
            { nombre: "ChatGPT (Free)", desc: "Diseño de sílabos, rúbricas y metodologías de enseñanza.", link: "https://chatgpt.com" },
            { nombre: "Canva Magic Design (Pago)", desc: "Diseño gráfico educativo avanzado y automatizado.", link: "https://www.canva.com" }
        ]
    },
    especial: {
        titulo: "Prompt Engineering y Ética de IA",
        badgeTexto: "Colección Especial",
        alias: "especial",
        ias: [
            { nombre: "Learn Prompting (Free)", desc: "Curso abierto y gratuito sobre ingeniería de prompts.", link: "https://learnprompting.org/es" },
            { nombre: "DeepLearning.AI Courses (Free)", desc: "Cursos cortos gratuitos sobre uso ético y técnico de IA.", link: "https://www.deeplearning.ai" }
        ]
    }
};

let tabAdminActual = 'ias'; // 'ias' o 'tutoriales'

document.addEventListener("DOMContentLoaded", () => {
    cargarDatosCompletos();
});

function cargarDatosCompletos() {
    const grid = document.getElementById('grid-ia');
    const gridTutos = document.getElementById('grid-tutos');
    const tablaBody = document.getElementById('tabla-admin-body');
    
    grid.innerHTML = '';
    gridTutos.innerHTML = '';
    tablaBody.innerHTML = '';

    let extras = JSON.parse(localStorage.getItem('isum_ias_extras')) || [];
    let tutos = JSON.parse(localStorage.getItem('isum_tutos_extras')) || [];
    let datosActuales = JSON.parse(JSON.stringify(categoriasData));

    // Fusionar IAs extras
    extras.forEach((item) => {
        if (datosActuales[item.categoria]) {
            datosActuales[item.categoria].ias.push({
                nombre: item.nombre,
                desc: item.descripcion,
                link: item.link || '#'
            });
        }
    });

    // Llenar tabla admin según la pestaña activa
    if (tabAdminActual === 'ias') {
        extras.forEach((item, index) => {
            tablaBody.innerHTML += `
                <tr>
                    <td>${item.nombre}</td>
                    <td><span class="badge ${item.categoria}" style="font-size:0.7rem; padding:2px 6px;">${item.categoria.toUpperCase()}</span></td>
                    <td>
                        <button onclick="cargarParaEditar(${index})" class="btn-accion-editar">✏️ Modificar</button>
                        <button onclick="eliminarIA(${index})" class="btn-accion-eliminar">🗑️ Eliminar</button>
                    </td>
                </tr>
            `;
        });
        if (extras.length === 0) {
            tablaBody.innerHTML = `<tr><td colspan="3" style="text-align:center; color:#94a3b8; padding: 15px;">No hay IAs agregadas aún.</td></tr>`;
        }
    } else {
        tutos.forEach((item, index) => {
            tablaBody.innerHTML += `
                <tr>
                    <td>${item.titulo}</td>
                    <td><span class="badge ${item.plataforma.toLowerCase()}" style="font-size:0.7rem; padding:2px 6px;">${item.plataforma.toUpperCase()}</span></td>
                    <td>
                        <button onclick="cargarParaEditarTuto(${index})" class="btn-accion-editar">✏️ Modificar</button>
                        <button onclick="eliminarTuto(${index})" class="btn-accion-eliminar">🗑️ Eliminar</button>
                    </td>
                </tr>
            `;
        });
        if (tutos.length === 0) {
            tablaBody.innerHTML = `<tr><td colspan="3" style="text-align:center; color:#94a3b8; padding: 15px;">No hay tutoriales agregados aún.</td></tr>`;
        }
    }

    // Renderizar tarjetas de IAs públicas
    for (let key in datosActuales) {
        let cat = datosActuales[key];
        let card = document.createElement('div');
        card.className = 'card-ia';
        card.setAttribute('data-categoria', cat.alias);

        let listaHTML = '';
        cat.ias.forEach(ia => {
            listaHTML += `
                <div class="item-ia-opcion">
                    <h4>${ia.nombre}</h4>
                    <p>${ia.desc}</p>
                    <a href="${ia.link}" target="_blank" class="btn-visitar">Visitar Herramienta ↗</a>
                </div>
            `;
        });

        card.innerHTML = `
            <span class="badge ${cat.alias}">${cat.badgeTexto}</span>
            <h3>${cat.titulo}</h3>
            <div class="lista-opciones-ia">
                ${listaHTML}
            </div>
            <div class="card-status" style="margin-top:0.8rem; font-size:0.8rem; color:var(--color-accent);">Múltiples opciones disponibles</div>
        `;
        grid.appendChild(card);
    }

    // Renderizar tarjetas de Tutoriales públicos
    if (tutos.length === 0) {
        gridTutos.innerHTML = `<p style="color:var(--color-text-muted); text-align:center; grid-column: 1/-1;">Pronto se agregarán videotutoriales desde el panel de administración.</p>`;
    } else {
        tutos.forEach(tuto => {
            let cardTuto = document.createElement('div');
            cardTuto.className = 'card-tuto';
            cardTuto.innerHTML = `
                <div>
                    <span class="badge ${tuto.plataforma.toLowerCase()}">${tuto.plataforma}</span>
                    <h3>${tuto.titulo}</h3>
                    <p>${tuto.descripcion}</p>
                </div>
                <a href="${tuto.link}" target="_blank" class="btn-visitar" style="margin-top: 1rem; text-align:center;">Ver Tutorial ↗</a>
            `;
            gridTutos.appendChild(cardTuto);
        });
    }
}

// Cambiar entre pestañas en el panel admin
function cambiarTabAdmin(tab) {
    tabAdminActual = tab;
    const formIa = document.getElementById('form-ia');
    const formTuto = document.getElementById('form-tuto');
    const btnIa = document.getElementById('tab-btn-ias');
    const btnTuto = document.getElementById('tab-btn-tutos');
    const tituloTabla = document.getElementById('titulo-tabla-gestion');

    if (tab === 'ias') {
        formIa.style.display = 'block';
        formTuto.style.display = 'none';
        btnIa.classList.add('active');
        btnTuto.classList.remove('active');
        tituloTabla.textContent = "🛠️ Administrar Herramientas de IA Agregadas";
    } else {
        formIa.style.display = 'none';
        formTuto.style.display = 'block';
        btnTuto.classList.add('active');
        btnIa.classList.remove('active');
        tituloTabla.textContent = "🛠️ Administrar Tutoriales Agregados";
    }
    cargarDatosCompletos();
}

function abrirModalPassword(event) {
    if (event) event.preventDefault();
    document.getElementById('modal-password').style.display = 'flex';
    document.getElementById('input-admin-pass').value = '';
    document.getElementById('input-admin-pass').focus();
}

function cerrarModalPassword() {
    document.getElementById('modal-password').style.display = 'none';
}

function verificarPassword() {
    const claveIngresada = document.getElementById('input-admin-pass').value;
    if (claveIngresada === PASSWORD_ADMIN) {
        cerrarModalPassword();
        const panel = document.getElementById('admin-panel');
        panel.style.display = 'block';
        panel.scrollIntoView({ behavior: 'smooth' });
    } else {
        mostrarNotificacion("❌ Contraseña incorrecta. Acceso denegado.");
        document.getElementById('input-admin-pass').value = '';
    }
}

function cerrarAdminPanel() {
    document.getElementById('admin-panel').style.display = 'none';
    resetearFormularioAdmin();
    resetearFormularioTuto();
}

// Guardar o actualizar IA
function guardarOActualizarIA(event) {
    event.preventDefault();
    const editIndex = document.getElementById('edit-index').value;
    const nombre = document.getElementById('nombre-ia').value;
    const categoria = document.getElementById('categoria-ia').value;
    const descripcion = document.getElementById('desc-ia').value;
    const link = document.getElementById('link-ia').value;

    let extras = JSON.parse(localStorage.getItem('isum_ias_extras')) || [];

    if (editIndex === "") {
        extras.push({ nombre, categoria, descripcion, link });
        mostrarNotificacion("✅ ¡Herramienta de IA agregada exitosamente!");
    } else {
        extras[editIndex] = { nombre, categoria, descripcion, link };
        mostrarNotificacion("✏️ ¡Herramienta modificada correctamente!");
    }

    localStorage.setItem('isum_ias_extras', JSON.stringify(extras));
    cargarDatosCompletos();
    resetearFormularioAdmin();
}

// Guardar o actualizar Tutorial
function guardarOActualizarTuto(event) {
    event.preventDefault();
    const editIndex = document.getElementById('edit-index-tuto').value;
    const titulo = document.getElementById('titulo-tuto').value;
    const plataforma = document.getElementById('plataforma-tuto').value;
    const descripcion = document.getElementById('desc-tuto').value;
    const link = document.getElementById('link-tuto').value;

    let tutos = JSON.parse(localStorage.getItem('isum_tutos_extras')) || [];

    if (editIndex === "") {
        tutos.push({ titulo, plataforma, descripcion, link });
        mostrarNotificacion("✅ ¡Video tutorial agregado exitosamente!");
    } else {
        tutos[editIndex] = { titulo, plataforma, descripcion, link };
        mostrarNotificacion("✏️ ¡Tutorial modificado correctamente!");
    }

    localStorage.setItem('isum_tutos_extras', JSON.stringify(tutos));
    cargarDatosCompletos();
    resetearFormularioTuto();
}

function cargarParaEditar(index) {
    let extras = JSON.parse(localStorage.getItem('isum_ias_extras')) || [];
    let item = extras[index];
    if (item) {
        document.getElementById('edit-index').value = index;
        document.getElementById('nombre-ia').value = item.nombre;
        document.getElementById('categoria-ia').value = item.categoria;
        document.getElementById('desc-ia').value = item.descripcion;
        document.getElementById('link-ia').value = item.link;

        document.getElementById('btn-submit-form').textContent = "💾 Actualizar IA";
        document.getElementById('btn-cancel-edit').style.display = "inline-block";
        document.getElementById('form-ia').scrollIntoView({ behavior: 'smooth' });
    }
}

function cargarParaEditarTuto(index) {
    let tutos = JSON.parse(localStorage.getItem('isum_tutos_extras')) || [];
    let item = tutos[index];
    if (item) {
        document.getElementById('edit-index-tuto').value = index;
        document.getElementById('titulo-tuto').value = item.titulo;
        document.getElementById('plataforma-tuto').value = item.plataforma;
        document.getElementById('desc-tuto').value = item.descripcion;
        document.getElementById('link-tuto').value = item.link;

        document.getElementById('btn-submit-tuto').textContent = "💾 Actualizar Tutorial";
        document.getElementById('btn-cancel-edit-tuto').style.display = "inline-block";
        document.getElementById('form-tuto').scrollIntoView({ behavior: 'smooth' });
    }
}

function eliminarIA(index) {
    let extras = JSON.parse(localStorage.getItem('isum_ias_extras')) || [];
    extras.splice(index, 1);
    localStorage.setItem('isum_ias_extras', JSON.stringify(extras));
    cargarDatosCompletos();
    mostrarNotificacion("🗑️ Herramienta eliminada correctamente.");
}

function eliminarTuto(index) {
    let tutos = JSON.parse(localStorage.getItem('isum_tutos_extras')) || [];
    tutos.splice(index, 1);
    localStorage.setItem('isum_tutos_extras', JSON.stringify(tutos));
    cargarDatosCompletos();
    mostrarNotificacion("🗑️ Tutorial eliminado correctamente.");
}

function resetearFormularioAdmin() {
    document.getElementById('form-ia').reset();
    document.getElementById('edit-index').value = "";
    document.getElementById('btn-submit-form').textContent = "💾 Guardar IA";
    document.getElementById('btn-cancel-edit').style.display = "none";
}

function resetearFormularioTuto() {
    document.getElementById('form-tuto').reset();
    document.getElementById('edit-index-tuto').value = "";
    document.getElementById('btn-submit-tuto').textContent = "💾 Guardar Tutorial";
    document.getElementById('btn-cancel-edit-tuto').style.display = "none";
}

function mostrarNotificacion(mensaje) {
    const existente = document.querySelector('.toast-notificacion');
    if (existente) existente.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-notificacion';
    toast.innerHTML = `<span>${mensaje}</span>`;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function filtrarCategoria(categoria, event) {
    const botones = document.querySelectorAll('.filter-btn');
    botones.forEach(btn => btn.classList.remove('active'));

    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }

    const tarjetas = document.querySelectorAll('.card-ia');
    tarjetas.forEach(tarjeta => {
        if (categoria === 'todas') {
            tarjeta.style.display = 'flex';
        } else {
            if (tarjeta.getAttribute('data-categoria') === categoria) {
                tarjeta.style.display = 'flex';
            } else {
                tarjeta.style.display = 'none';
            }
        }
    });
}

function buscarIA() {
    const textoBusqueda = document.getElementById('input-buscar').value.toLowerCase();
    const tarjetas = document.querySelectorAll('.card-ia');

    tarjetas.forEach(tarjeta => {
        const contenido = tarjeta.textContent.toLowerCase();
        if (contenido.includes(textoBusqueda) || textoBusqueda === '') {
            tarjeta.style.display = 'flex';
        } else {
            tarjeta.style.display = 'none';
        }
    });
}
