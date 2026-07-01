using System;
using BeanButton.Api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace BeanButton.Api.Data.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20260701000001_AddPushSubscriptions")]
    partial class AddPushSubscriptions
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("BeanButton.Api.Models.Brew", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("integer");

                NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                b.Property<DateTime>("BrewedAt")
                    .HasColumnType("timestamp with time zone");

                b.Property<int>("Kudos")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("integer")
                    .HasDefaultValue(0);

                b.Property<string>("Name")
                    .IsRequired()
                    .HasMaxLength(100)
                    .HasColumnType("character varying(100)");

                b.HasKey("Id");

                b.HasIndex("BrewedAt")
                    .IsDescending(true);

                b.ToTable("Brews");
            });

            modelBuilder.Entity("BeanButton.Api.Models.PushSubscription", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("integer");

                NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                b.Property<string>("Auth")
                    .IsRequired()
                    .HasMaxLength(128)
                    .HasColumnType("character varying(128)");

                b.Property<DateTime>("CreatedAt")
                    .HasColumnType("timestamp with time zone");

                b.Property<string>("Endpoint")
                    .IsRequired()
                    .HasMaxLength(512)
                    .HasColumnType("character varying(512)");

                b.Property<string>("P256dh")
                    .IsRequired()
                    .HasMaxLength(256)
                    .HasColumnType("character varying(256)");

                b.HasKey("Id");

                b.HasIndex("Endpoint")
                    .IsUnique();

                b.ToTable("PushSubscriptions");
            });
#pragma warning restore 612, 618
        }
    }
}
