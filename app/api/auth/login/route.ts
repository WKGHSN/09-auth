import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../../_utils/utils';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // ---- важливо: слеш на початку ----
    const apiRes = await api.post('/auth/login', body);

    const setCookie = apiRes.headers['set-cookie'];

    if (setCookie) {
      const response = NextResponse.json(apiRes.data, { status: apiRes.status });

      if (Array.isArray(setCookie)) {
        for (const cookieStr of setCookie) {
          response.headers.append('Set-Cookie', cookieStr);
        }
      } else {
        response.headers.append('Set-Cookie', setCookie);
      }

      return response;
    }

    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status || 500 }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}