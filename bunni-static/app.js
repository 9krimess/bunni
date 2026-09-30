const input = document.getElementById('urlInput');
const btn = document.getElementById('launchBtn');

function openPortal(targetUrl) {
    let finalUrl = targetUrl.trim();
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
        finalUrl = 'https://duckduckgo.com/?q=' + encodeURIComponent(finalUrl);
    }

    // Check if an iframe viewer container already exists; if not, create one dynamically
    let viewer = document.getElementById('proxyViewer');
    if (!viewer) {
        viewer = document.createElement('div');
        viewer.id = 'proxyViewer';
        viewer.style.cssText = 'position:fixed; top:0; left:0; width:100vw; height:100vh; background:#09090b; z-index:9999; display:flex; flex-direction:column;';
        
        viewer.innerHTML = `
            <div style="background:#18181b; padding:10px 20px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #27272a;">
                <span style="font-family:monospace; color:#a855f7; font-weight:600;">bunni // active node</span>
                <button id="closeViewer" style="background:#27272a; color:#fff; border:none; padding:6px 14px; border-radius:6px; cursor:pointer;">Exit</button>
            </div>
            <iframe id="innerFrame" style="flex:1; border:none; width:100%; height:100%; background:#fff;"></iframe>
        `;
        document.body.appendChild(viewer);

        document.getElementById('closeViewer').addEventListener('click', () => {
            viewer.remove();
        });
    }

    // Load target inside sandbox frame
    document.getElementById('innerFrame').src = finalUrl;
}

btn.addEventListener('click', () => {
    if (input.value.trim()) {
        openPortal(input.value.trim());
    }
});

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && input.value.trim()) {
        openPortal(input.value.trim());
    }
});