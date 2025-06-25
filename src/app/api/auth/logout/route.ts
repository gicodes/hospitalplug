import { NextResponse } from 'next/server';

export async function POST() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  return NextResponse.json(await res.json());
}
