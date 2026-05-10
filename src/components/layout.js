const DashboardLayout = {
    render:function(usuario,contentHtml){
    const getRolColor = (rol) => {
        switch (rol) {
            case 'coordinador': return '#621132'
            case 'docente': return '#1b396a'
            case 'alumno': return '#10312b'
            default: return '#1b396a';
        }
    };

    const getRolName = (rol) => {
        switch (rol) {
            case 'coordinador': return 'Coordinador';
            case 'docente': return 'Docente';
            case 'alumno': return 'Alumno';
            default: return 'Usuario';
        }
    };

    const colorHeader = getRolColor(usuario.rol);
    const nombreRol = getRolName(usuario.rol);

    return `
    <div class="min=h=screen" style="background-color: #f5f5f5;">
        <header class="shadow-md" style="background-color: ${colorHeader};">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center py-4">
                    <div class="flex items-center gap-3">
                        <i class = "fas fa-graduation-cap text-white text-3xl"></i>
                        <div>
                        <h1 class="text-white text-xl font-bold">Sistema Integral de Informacion</h1>
                        <p class = "text-sm" style="color: rgba(255,255,255,0.9);">${nombreRol}</p>
                    </div>
                </div>
                <div class="flex items-center gap-4">
                    <div class="text-right">
                        <p class="text-sm font-medium text-white">${usuario.nombre}</p>
                        <p class = "text-xs" style="color: rgba(255,255,255,0.8);">${usuario.correo}</p>
                    </div>
                    <button onclick = "window.location.href = '/logout'" class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-white/10 transition-colors">
                        <i class="fas fa-sign-out-alt"></i> salir
                    </button>
                </div>
            </div>
        </div>
    </header>
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        ${contentHtml}
    </main>
    </div>
    `;
    }
};
