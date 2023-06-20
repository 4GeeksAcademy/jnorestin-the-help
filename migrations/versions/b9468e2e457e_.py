"""empty message

Revision ID: b9468e2e457e
Revises: 4a9049ceefc9
Create Date: 2023-06-19 16:31:16.410761

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b9468e2e457e'
down_revision = '4a9049ceefc9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('post_candidates',
    sa.Column('helper_id', sa.Integer(), nullable=False),
    sa.Column('post_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['helper_id'], ['helper.id'], ),
    sa.ForeignKeyConstraint(['post_id'], ['post.id'], ),
    sa.PrimaryKeyConstraint('helper_id', 'post_id')
    )
    op.drop_table('post_candidate')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('post_candidate',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('helper_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('post_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['helper_id'], ['helper.id'], name='post_candidate_helper_id_fkey'),
    sa.ForeignKeyConstraint(['post_id'], ['post.id'], name='post_candidate_post_id_fkey'),
    sa.PrimaryKeyConstraint('id', name='post_candidate_pkey')
    )
    op.drop_table('post_candidates')
    # ### end Alembic commands ###
