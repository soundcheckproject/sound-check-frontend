const c = [
	() => import("../../../src/routes/__layout.svelte"),
	() => import("../../../src/routes/__error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/forgotpassword/index.svelte"),
	() => import("../../../src/routes/register.svelte"),
	() => import("../../../src/routes/releases/index.svelte"),
	() => import("../../../src/routes/releases/[trackId].svelte"),
	() => import("../../../src/routes/artists/index.svelte"),
	() => import("../../../src/routes/artists/[artistId].svelte"),
	() => import("../../../src/routes/logout.svelte"),
	() => import("../../../src/routes/portal/__layout.svelte"),
	() => import("../../../src/routes/portal/index.svelte"),
	() => import("../../../src/routes/portal/profile/index.svelte"),
	() => import("../../../src/routes/portal/artist/__layout.svelte"),
	() => import("../../../src/routes/portal/artist/index.svelte"),
	() => import("../../../src/routes/portal/artist/royalties/index.svelte"),
	() => import("../../../src/routes/portal/artist/royalties/[trackId].svelte"),
	() => import("../../../src/routes/portal/artist/demo/index.svelte"),
	() => import("../../../src/routes/portal/artist/demo/submit.svelte"),
	() => import("../../../src/routes/portal/artist/demo/[trackId]-finance.svelte"),
	() => import("../../../src/routes/portal/artist/demo/[trackId]-edit.svelte"),
	() => import("../../../src/routes/portal/artist/demo/[trackId].svelte"),
	() => import("../../../src/routes/portal/staff/__layout.svelte"),
	() => import("../../../src/routes/portal/staff/index.svelte"),
	() => import("../../../src/routes/portal/staff/tracks.svelte"),
	() => import("../../../src/routes/portal/staff/users/index.svelte"),
	() => import("../../../src/routes/portal/staff/users/[userId]-edit.svelte"),
	() => import("../../../src/routes/portal/staff/users/[userId].svelte"),
	() => import("../../../src/routes/portal/staff/demo/index.svelte"),
	() => import("../../../src/routes/portal/staff/demo/[trackId]-finance.svelte"),
	() => import("../../../src/routes/portal/staff/demo/[trackId]-edit.svelte"),
	() => import("../../../src/routes/portal/staff/demo/[trackId].svelte"),
	() => import("../../../src/routes/login.svelte"),
	() => import("../../../src/routes/home.svelte"),
	() => import("../../../src/routes/test.svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/forgotpassword/index.svelte
	[/^\/forgotpassword\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/register.svelte
	[/^\/register\/?$/, [c[0], c[4]], [c[1]]],

	// src/routes/releases/index.svelte
	[/^\/releases\/?$/, [c[0], c[5]], [c[1]]],

	// src/routes/releases/[trackId].svelte
	[/^\/releases\/([^/]+?)\/?$/, [c[0], c[6]], [c[1]], (m) => ({ trackId: d(m[1])})],

	// src/routes/artists/index.svelte
	[/^\/artists\/?$/, [c[0], c[7]], [c[1]]],

	// src/routes/artists/[artistId].svelte
	[/^\/artists\/([^/]+?)\/?$/, [c[0], c[8]], [c[1]], (m) => ({ artistId: d(m[1])})],

	// src/routes/logout.svelte
	[/^\/logout\/?$/, [c[0], c[9]], [c[1]]],

	// src/routes/portal/index.svelte
	[/^\/portal\/?$/, [c[0], c[10], c[11]], [c[1]]],

	// src/routes/portal/profile/index.svelte
	[/^\/portal\/profile\/?$/, [c[0], c[10], c[12]], [c[1]]],

	// src/routes/portal/artist/index.svelte
	[/^\/portal\/artist\/?$/, [c[0], c[10], c[13], c[14]], [c[1]]],

	// src/routes/portal/artist/royalties/index.svelte
	[/^\/portal\/artist\/royalties\/?$/, [c[0], c[10], c[13], c[15]], [c[1]]],

	// src/routes/portal/artist/royalties/[trackId].svelte
	[/^\/portal\/artist\/royalties\/([^/]+?)\/?$/, [c[0], c[10], c[13], c[16]], [c[1]], (m) => ({ trackId: d(m[1])})],

	// src/routes/portal/artist/demo/index.svelte
	[/^\/portal\/artist\/demo\/?$/, [c[0], c[10], c[13], c[17]], [c[1]]],

	// src/routes/portal/artist/demo/submit.svelte
	[/^\/portal\/artist\/demo\/submit\/?$/, [c[0], c[10], c[13], c[18]], [c[1]]],

	// src/routes/portal/artist/demo/[trackId]-finance.svelte
	[/^\/portal\/artist\/demo\/([^/]+?)-finance\/?$/, [c[0], c[10], c[13], c[19]], [c[1]], (m) => ({ trackId: d(m[1])})],

	// src/routes/portal/artist/demo/[trackId]-edit.svelte
	[/^\/portal\/artist\/demo\/([^/]+?)-edit\/?$/, [c[0], c[10], c[13], c[20]], [c[1]], (m) => ({ trackId: d(m[1])})],

	// src/routes/portal/artist/demo/[trackId].svelte
	[/^\/portal\/artist\/demo\/([^/]+?)\/?$/, [c[0], c[10], c[13], c[21]], [c[1]], (m) => ({ trackId: d(m[1])})],

	// src/routes/portal/staff/index.svelte
	[/^\/portal\/staff\/?$/, [c[0], c[10], c[22], c[23]], [c[1]]],

	// src/routes/portal/staff/tracks.svelte
	[/^\/portal\/staff\/tracks\/?$/, [c[0], c[10], c[22], c[24]], [c[1]]],

	// src/routes/portal/staff/users/index.svelte
	[/^\/portal\/staff\/users\/?$/, [c[0], c[10], c[22], c[25]], [c[1]]],

	// src/routes/portal/staff/users/[userId]-edit.svelte
	[/^\/portal\/staff\/users\/([^/]+?)-edit\/?$/, [c[0], c[10], c[22], c[26]], [c[1]], (m) => ({ userId: d(m[1])})],

	// src/routes/portal/staff/users/[userId].svelte
	[/^\/portal\/staff\/users\/([^/]+?)\/?$/, [c[0], c[10], c[22], c[27]], [c[1]], (m) => ({ userId: d(m[1])})],

	// src/routes/portal/staff/demo/index.svelte
	[/^\/portal\/staff\/demo\/?$/, [c[0], c[10], c[22], c[28]], [c[1]]],

	// src/routes/portal/staff/demo/[trackId]-finance.svelte
	[/^\/portal\/staff\/demo\/([^/]+?)-finance\/?$/, [c[0], c[10], c[22], c[29]], [c[1]], (m) => ({ trackId: d(m[1])})],

	// src/routes/portal/staff/demo/[trackId]-edit.svelte
	[/^\/portal\/staff\/demo\/([^/]+?)-edit\/?$/, [c[0], c[10], c[22], c[30]], [c[1]], (m) => ({ trackId: d(m[1])})],

	// src/routes/portal/staff/demo/[trackId].svelte
	[/^\/portal\/staff\/demo\/([^/]+?)\/?$/, [c[0], c[10], c[22], c[31]], [c[1]], (m) => ({ trackId: d(m[1])})],

	// src/routes/login.svelte
	[/^\/login\/?$/, [c[0], c[32]], [c[1]]],

	// src/routes/home.svelte
	[/^\/home\/?$/, [c[0], c[33]], [c[1]]],

	// src/routes/test.svelte
	[/^\/test\/?$/, [c[0], c[34]], [c[1]]]
];

// we import the root layout/error components eagerly, so that
// connectivity errors after initialisation don't nuke the app
export const fallback = [c[0](), c[1]()];