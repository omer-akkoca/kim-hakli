import { createClient } from 'npm:@supabase/supabase-js@2';

Deno.serve(async (req) => {
  try {
    const authHeader = req.headers.get('Authorization');

    if (!authHeader) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const token = authHeader.replace('Bearer ', '');

    const {
      data: { user },
      error: getUserError,
    } = await supabase.auth.getUser(token);

    if (getUserError || !user) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    const { error: updateError } = await supabase
      .from('users')
      .update({
        status: 'deleted',
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    if (updateError) {
      return Response.json({ error: updateError.message }, { status: 500 });
    }

    return Response.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return Response.json(
      { error: error?.message ?? 'Internal server error' },
      { status: 500 },
    );
  }
});