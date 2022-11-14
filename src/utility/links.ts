import { goto } from '$app/navigation';

/** Prevents default navigation and uses {@link goto} instead. */
export function gotoHref(e: Event)
{
	e.preventDefault();
	goto((e.currentTarget as HTMLAnchorElement).href);
}
